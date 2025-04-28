"use server"

import {LoginSchema} from "@/lib/definitions";
import {prisma} from "@/lib/db";
import {compare} from "bcrypt"
import {createSession, generateSessionToken} from "@/lib/session";
import {setSessionTokenCookie} from "@/lib/cookie";
import {redirect} from "next/navigation";

export const loginAction = async (prevState : any, formData : FormData) => {
    try {
        const validatedFields = LoginSchema.safeParse({
            email : formData.get("email"),
            password : formData.get("password")
        })
        if (!validatedFields.success) {
            return {
                errors : {
                    email : validatedFields.error.flatten().fieldErrors.email,
                    password : validatedFields.error.flatten().fieldErrors.password
                }
            }
        }
        const {password,email} = validatedFields.data
        let findUser = await prisma.user.findUnique({where : {email}});
        if (!findUser) {
            return {
                errors : {
                    email : "This email doesn't exist"
                }
            }
        }
        const result = await compare(password, findUser.password)
        if (!result) {
            return {
                errors : {
                    password : "Password is wrong"
                }
            }
        }
        const sessionToken = await generateSessionToken();
        const session = await createSession(sessionToken, findUser.id)
        await setSessionTokenCookie(sessionToken, session.expiresAt);
        return redirect("/");
    } catch (e) {
        console.log(e);
    }
}