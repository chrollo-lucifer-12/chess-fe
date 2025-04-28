"use client"

import {signupAction} from "@/app/(auth)/signup/actions";
import {useActionState} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import AuthForm from "@/components/auth-form";


const SignupPage = () => {
    const [state, formAction, isPending] =  useActionState(signupAction, null);

  //  console.log(state?.errors)

    return <div className={"h-full w-full flex justify-center items-center"}>
        <Card className={"bg-black border-none rounded-xl w-[25%]"}>
            <CardHeader className={"flex flex-col justify-center items-center"}>
                <CardTitle className={"text-white"}>Create your account</CardTitle>
                <CardDescription className={"text-inputtext font-semibold"}>Let's get started</CardDescription>
            </CardHeader>
            <CardContent>
                <AuthForm state={state} formAction={formAction} signup={true} isPending={isPending}/>
            </CardContent>
        </Card>

    </div>
}

export default SignupPage