import z from "zod"

export const SignupSchema = z.object({
    email : z.string().email({message : "Enter valid email"}),
    username : z.string().min(3, {message : "Username must be at least 3 characters long"}),
    password : z.string().superRefine((val,ctx) => {
        if (val.length < 8) {
            ctx.addIssue({
                code : z.ZodIssueCode.too_small,
                minimum : 8,
                type : "string",
                inclusive : true,
                message : "Password must be at least 8 characters long"
            })
            return
        }
        if (!/[a-z]/.test(val)) {
            ctx.addIssue({
                code : z.ZodIssueCode.custom,
                message : "Password must contain at least one lowercase letter"
            })
            return;
        }
        if (!/[A-Z]/.test(val)) {
            ctx.addIssue({
                code : z.ZodIssueCode.custom,
                message : "Password must be contain at least one uppercase letter"
            })
            return;
        }
        if (!/[0-9]/.test(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password must contain at least one number",
            });
            return;
        }
        if (!/[^A-Za-z0-9]/.test(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password must contain at least one special character",
            });
            return;
        }
    })
})

export const LoginSchema = z.object({
    email : z.string().email({message : "Enter valid email"}),
    password : z.string().superRefine((val,ctx) => {
        if (val.length < 8) {
            ctx.addIssue({
                code : z.ZodIssueCode.too_small,
                minimum : 8,
                type : "string",
                inclusive : true,
                message : "Password must be at least 8 characters long"
            })
            return
        }
        if (!/[a-z]/.test(val)) {
            ctx.addIssue({
                code : z.ZodIssueCode.custom,
                message : "Password must contain at least one lowercase letter"
            })
            return;
        }
        if (!/[A-Z]/.test(val)) {
            ctx.addIssue({
                code : z.ZodIssueCode.custom,
                message : "Password must be contain at least one uppercase letter"
            })
            return;
        }
        if (!/[0-9]/.test(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password must contain at least one number",
            });
            return;
        }
        if (!/[^A-Za-z0-9]/.test(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password must contain at least one special character",
            });
            return;
        }
    })
})

export const sidebarlinks = [
    {
        name : "Play",
        href : "/play",
        src : "/p1.png"
    },
    {
        name : "Puzzles",
        href: "/puzzles",
        src : "/p2.png"
    },
    {
        name : "Learn",
        href: "/learn",
        src : "/p3.png"
    },
    {
        name : "Watch",
        href: "/watch",
        src : "/p4.png"
    },
    {
        name : "News",
        href: "/news",
        src : "/p5.png"
    },
    {
        name : "Social",
        href: "/social",
        src : "/p6.png"
    }
]