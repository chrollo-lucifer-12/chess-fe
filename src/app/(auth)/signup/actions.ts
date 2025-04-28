"use server"

import {SignupSchema} from "@/lib/definitions"
import {prisma} from "@/lib/db"
import {hash} from "bcrypt"
import {redirect} from "next/navigation";

interface ActionResult {
    errors?: {
        email? : string[],
        username?: string[],
        password?: string[]
    },
}

export const signupAction = async (prevState : any, formData : FormData) => {
    try {
        const validatedFields = SignupSchema.safeParse({
            email : formData.get("email"),
            password : formData.get("password"),
            username : formData.get("username")
        })

        if (!validatedFields.success) {
            console.log(validatedFields.error);
            return {
                errors : {
                    email : validatedFields.error.flatten().fieldErrors.email,
                    username : validatedFields.error.flatten().fieldErrors.username,
                    password : validatedFields.error.flatten().fieldErrors.password
                }
            }
        }
        const {password, username,email} = validatedFields.data
        let findUser = await prisma.user.findUnique({where : {email}});
        if (findUser) {
            return {
                errors : {
                    email : "This email already exists"
                }
            }
        }
        findUser = await prisma.user.findUnique({where : {username}})
        if (findUser) {
            return {
                errors : {
                    username : "This username already exists"
                }
            }
        }
        const hashedPassword = await hash(password, 10);
        await prisma.user.create({
            data : {
                email,
                username,
                password : hashedPassword
            }
        })
        redirect("/login");
    } catch (e) {
        console.log(e);
    }
}