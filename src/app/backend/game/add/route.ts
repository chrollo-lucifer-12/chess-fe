import {prisma} from "@/lib/db"

export const POST = async (req : Request) => {
    try {
        const body = await req.json();
        const {gameId, player1, player2} = body

        if (!gameId || !player1 || !player2) {
            return new Response(
                JSON.stringify({ error: "incomplete data" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        await prisma.game.create({
            data : {
                id : gameId,
                player1,
                player2
            }
        })

        return new Response(
            JSON.stringify({ message: "game added" }),
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