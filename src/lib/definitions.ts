import z from "zod"
import {ClockIcon, MedalIcon, PlayIcon} from "lucide-react";

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
    },
    {
        name : "Puzzles",
        href: "/puzzles",
    },
    {
        name : "Learn",
        href: "/learn",
    },
    {
        name : "Watch",
        href: "/watch",
    },
    {
        name : "News",
        href: "/news",

    },
    {
        name : "Social",
        href: "/social",

    }
]

export function findSrc(symbol: string) {
    switch (symbol) {
        case "wp": return "/white_pawn.png";
        case "wr": return "/white_rook.png";
        case "wn": return "/white_knight.png";
        case "wb": return "/white_bishop.png";
        case "wq": return "/white_queen.png";
        case "wk": return "/white_king.png";
        case "bp": return "/black_pawn.png";
        case "br": return "/black_rook.png";
        case "bn": return "/black_knight.png";
        case "bb": return "/black_bishop.png";
        case "bq": return "/black_queen.png";
        case "bk": return "/black_king.png";
        default: return null;
    }
}

export const  initialCells=[
        { coords: { x: 0, y: 0 }, symbol: "br" },
{ coords: { x: 0, y: 1 }, symbol: "bn" },
{ coords: { x: 0, y: 2 }, symbol: "bb" },
{ coords: { x: 0, y: 3 }, symbol: "bq" },
{ coords: { x: 0, y: 4 }, symbol: "bk" },
{ coords: { x: 0, y: 5 }, symbol: "bb" },
{ coords: { x: 0, y: 6 }, symbol: "bn" },
{ coords: { x: 0, y: 7 }, symbol: "br" },
{ coords: { x: 1, y: 0 }, symbol: "bp" },
{ coords: { x: 1, y: 1 }, symbol: "bp" },
{ coords: { x: 1, y: 2 }, symbol: "bp" },
{ coords: { x: 1, y: 3 }, symbol: "bp" },
{ coords: { x: 1, y: 4 }, symbol: "bp" },
{ coords: { x: 1, y: 5 }, symbol: "bp" },
{ coords: { x: 1, y: 6 }, symbol: "bp" },
{ coords: { x: 1, y: 7 }, symbol: "bp" },
{ coords: { x: 6, y: 0 }, symbol: "wp" },
{ coords: { x: 6, y: 1 }, symbol: "wp" },
{ coords: { x: 6, y: 2 }, symbol: "wp" },
{ coords: { x: 6, y: 3 }, symbol: "wp" },
{ coords: { x: 6, y: 4 }, symbol: "wp" },
{ coords: { x: 6, y: 5 }, symbol: "wp" },
{ coords: { x: 6, y: 6 }, symbol: "wp" },
{ coords: { x: 6, y: 7 }, symbol: "wp" },
{ coords: { x: 7, y: 0 }, symbol: "wr" },
{ coords: { x: 7, y: 1 }, symbol: "wn" },
{ coords: { x: 7, y: 2 }, symbol: "wb" },
{ coords: { x: 7, y: 3 }, symbol: "wq" },
{ coords: { x: 7, y: 4 }, symbol: "wk" },
{ coords: { x: 7, y: 5 }, symbol: "wb" },
{ coords: { x: 7, y: 6 }, symbol: "wn" },
{ coords: { x: 7, y: 7 }, symbol: "wr" },
    ...Array.from({ length: 4 }, (_, rowOffset) =>
        Array.from({ length: 8 }, (_, y) => ({
            coords: { x: 2 + rowOffset, y },
            symbol: "",
        }))
    ).flat(),
]

export const herocards = [
    {
        icon : PlayIcon,
        title : "10M+",
        subtitle : "Daily Games"
    },
    {
        icon : MedalIcon,
        title : "50K+",
        subtitle : "Tournaments"
    },
    {
        icon : ClockIcon,
        title : "24/7",
        subtitle : "Live Games"
    }
]