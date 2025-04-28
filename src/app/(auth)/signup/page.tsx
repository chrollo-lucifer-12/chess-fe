"use client"

import {signupAction} from "@/app/(auth)/signup/actions";
import {useActionState} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import FormGenerator from "@/components/form-generator";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";


const SignupPage = () => {
    const [state, formAction, isPending] =  useActionState(signupAction, null);

    console.log(state?.errors)

    return <div className={"h-full w-full flex justify-center items-center"}>
        <Card className={"bg-black border-none rounded-xl w-[25%]"}>
            <CardHeader className={"flex flex-col justify-center items-center"}>
                <CardTitle className={"text-white"}>Create your account</CardTitle>
                <CardDescription className={"text-inputtext font-semibold"}>Let's get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className={"flex flex-col gap-y-3"}>
                    <FormGenerator inputType={"input"} name={"email"} label={"Email"} placeholder={"Email"}
                                   type={"email"} error={state?.errors.email}/>
                    <FormGenerator inputType={"input"} name={"username"} label={"Username"} placeholder={"Username"}
                                   type={"text"} error={state?.errors.username}/>
                    <FormGenerator inputType={"input"} name={"password"} label={"Password"} placeholder={"Password"}
                                   type={"password"} error={state?.errors.password}/>
                    <Button
                        disabled={isPending}
                        className={"mt-4 bg-buttonbg border-2 border-[#131316] text-inputtext relative overflow-hidden group"}>
                        <span
                            className={"absolute inset-0 bg-white/5 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"}/>
                        <span className="relative z-10 font-bold">
    Create Account
  </span>
                    </Button>

                    <p className={"text-inputtext text-xs text-center mt-2"}>or sign up with</p>

                    <Button className={"bg-white hover:bg-[#E5E0E2] transition duration-300"}>
                        <Image src={"/google-icon.png"} alt={"google"} width={20} height={20} />
                    </Button>

                    <span className={"flex justify-center gap-x-1 items-center text-white text-xs"}>
               <p> Already have an account? </p> <Link href={"/login"} className={"underline"}>Login</Link>
                </span>
                </form>
            </CardContent>
        </Card>

    </div>
}

export default SignupPage