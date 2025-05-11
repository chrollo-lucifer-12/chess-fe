import {prisma} from "@/lib/db";

export const POST = async (req: Request)=> {
    try {
        const body = await req.json();
        const {result,game_id} = body

        if (!result || !game_id) {
            return new Response(
                JSON.stringify({ error: "incomplete data" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const game = await prisma.game.findUnique({where : {id : game_id}})

        if (!game) {
            return new Response(
                JSON.stringify({ error: "Game doesn't exist" }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        await prisma.game.update({
            where : {id : game_id},
            data : {
                status : "NOTLIVE",
                result
            }
        })

        return new Response(
            JSON.stringify({ message: "game updated" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );

    } catch (e) {
        console.log(e);
        return new Response(
            JSON.stringify({ error: "internal server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}