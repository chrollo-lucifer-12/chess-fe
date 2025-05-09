import {prisma} from "@/lib/db"

export const POST = async (req : Request) => {
    try {
        const body = await req.json();
        const {piece, from, to, gameId, moveType, turnNumber, promotion} = body

        if (!piece || !from || !to || !gameId || !moveType || !turnNumber) {
            return new Response(
                JSON.stringify({ error: "incomplete data" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        await prisma.move.create({
            data : {
                gameId,
                piece,
                x1 : from.x,
                y1 : from.y,
                x2 : to.x,
                y2 : to.y,
                moveType,
                turnNumber,
                ...(promotion && { promotion })
            }
        })

        return new Response(
            JSON.stringify({ message: "move added" }),
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