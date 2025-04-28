"use client"

import {signupAction} from "@/app/(auth)/signup/actions";
import {useActionState} from "react";


const SignupPage = () => {
    const [state, formAction, isPending] =  useActionState(signupAction, null);

    return <form action={formAction}>
        
    </form>
}

export default SignupPage