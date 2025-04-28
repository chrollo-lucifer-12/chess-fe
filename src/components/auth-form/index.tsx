"use client"

import FormGenerator from "@/components/form-generator";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface AuthFormProps {
    signup: boolean
    isPending: boolean
    state : any
    formAction : (payload: FormData) => void
}

const AuthForm = ({formAction,isPending,signup,state} : AuthFormProps) => {
    return <form action={formAction} className={"flex flex-col gap-y-3 w-full"}>
        <FormGenerator inputType={"input"} name={"email"} label={"Email"} placeholder={"Email"}
                       type={"email"} error={state?.errors.email}/>
        {
            signup &&  <FormGenerator inputType={"input"} name={"username"} label={"Username"} placeholder={"Username"}
                                      type={"text"} error={state?.errors.username}/>
        }
        <FormGenerator inputType={"input"} name={"password"} label={"Password"} placeholder={"Password"}
                       type={"password"} error={state?.errors.password}/>
        <Button
            type={"submit"}
            disabled={isPending}
            className={"mt-4 bg-buttonbg border-2 border-[#131316] text-inputtext relative overflow-hidden group"}>
                        <span
                            className={"absolute inset-0 bg-white/5 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"}/>
            <span className="relative z-10 font-bold">
    {
        signup ? "Create Account" : "Login"
    }
  </span>
        </Button>

        <p className={"text-inputtext text-xs text-center mt-2"}>{signup ? "or sign up with" : "or log in with"}</p>

        <Button type={"button"} className={"bg-white hover:bg-[#E5E0E2] transition duration-300"} >
            <Link href={"/login/github"}>
                <Image src={"/github-mark.png"} alt={"google"} width={20} height={20}/>
            </Link>
        </Button>

        <span className={"flex justify-center gap-x-1 items-center text-white text-xs"}>
               <p> {signup ? "Already have an account?" : "Don't have an account"} </p> <Link href={signup ? "/login" : "/signup"} className={"underline"}>{signup ? "Login" : "Signup"}</Link>
                </span>
    </form>
}

export default AuthForm