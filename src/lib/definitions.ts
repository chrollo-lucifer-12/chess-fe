import z from "zod"

export const SignupSchema = z.object({
    email : z.string().email({message : "Enter valid email"}),
    username : z.string().min(3, {message : "Username must be at least 8 characters long"}),
    password : z.string().superRefine((val,ctx) => {
        if (val.length < 8) {
            ctx.addIssue({
                code : z.ZodIssueCode.too_small,
                minimum : 8,
                type : "string",
                inclusive : true,
                message : "Password must be at least 8 characters long"
            })
        }
        if (!/[a-z]/.test(val)) {
            ctx.addIssue({
                code : z.ZodIssueCode.custom,
                message : "Password must contain at least one lowercase letter"
            })
        }
        if (!/[A-Z]/.test(val)) {
            ctx.addIssue({
                code : z.ZodIssueCode.custom,
                message : "Password must be contain at least one uppercase letter"
            })
        }
        if (!/[0-9]/.test(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password must contain at least one number",
            });
        }
        if (!/[^A-Za-z0-9]/.test(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password must contain at least one special character",
            });
        }
    })
})