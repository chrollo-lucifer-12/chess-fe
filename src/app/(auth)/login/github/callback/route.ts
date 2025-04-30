import { generateSessionToken, createSession } from "@/lib/session";
import {setSessionTokenCookie} from "@/lib/cookie"
import { github } from "@/lib/oauth";
import { cookies } from "next/headers";

import type { OAuth2Tokens } from "arctic";
import {prisma} from "@/lib/db";

export async function GET(request : Request) {

    try {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");

        const cookieStore = await cookies();
        const storedState = cookieStore.get("github_oauth_state")?.value ?? null;
        if (code === null || state === null || storedState === null) {
            return Response.redirect(new URL("/error?reason=missing_params", request.url));
        }
        if (state !== storedState) {
            return Response.redirect(new URL("/error?reason=state_mismatch", request.url));
        }

        let tokens: OAuth2Tokens;
        try {
            tokens = await github.validateAuthorizationCode(code);
        } catch (e) {
            return Response.redirect(new URL("/error?reason=invalid_code", request.url));
        }
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken()}`
            }
        });
        const githubUser = await githubUserResponse.json();
        const githubUserId = githubUser.id;
        const githubUsername = githubUser.login;
        const githubAvatar = githubUser.avatar_url;
        const existingUser = await prisma.user.findFirst({where : {githubId : githubUserId}})
        if (existingUser !== null) {
            const sessionToken = await generateSessionToken();
            const session = await createSession(sessionToken, existingUser.id);
            await setSessionTokenCookie(sessionToken, session.expiresAt);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/"
                }
            });
        }
        const user = await prisma.user.create({
            data : {
                githubId : githubUserId,
                username : githubUsername,
                avatarUrl : githubAvatar
            }
        })

        const sessionToken = await generateSessionToken();
        const session = await createSession(sessionToken, user.id);
        await setSessionTokenCookie(sessionToken, session.expiresAt);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    } catch (e) {
        return Response.redirect(new URL("/error?reason=internal_error", request.url));
    }


}