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

        const user1 = await prisma.user.findUnique({where : {username : player1.username}});
        const user2 = await prisma.user.findUnique({where : {username : player2.username}});

        if (!user1 || !user2) {
            return new Response(
                JSON.stringify({ error: "internal server error" }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const p1 = await prisma.player.create({
            data : {
                userId : user1.id,
                color : player1.color
            }
        })

        const p2 = await prisma.player.create({
            data : {
                userId:  user2.id,
                color : player2.color
            }
        })

        await prisma.game.create({
            data : {
                id : gameId,
                playerId1 : p1.id,
                playerId2 : p2.id
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