"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import AuthForm from "@/components/auth-form";
import {useActionState} from "react";
import {loginAction} from "@/app/(auth)/login/actions";

const LoginPage = () => {

    const [state, formAction, isPending] =  useActionState(loginAction, null);

    return <div className={"h-full w-full flex justify-center items-center"}>
        <Card className={"bg-black border-none rounded-xl w-[25%]"}>
            <CardHeader className={"flex flex-col justify-center items-center"}>
                <CardTitle className={"text-white"}>Login to your account</CardTitle>
                <CardDescription className={"text-inputtext font-semibold"}>Let's get started</CardDescription>
            </CardHeader>
            <CardContent>
                <AuthForm state={state} formAction={formAction} signup={false} isPending={isPending}/>
            </CardContent>
        </Card>

    </div>
}

export default LoginPage