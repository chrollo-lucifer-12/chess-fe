"use server"

import {prisma} from "@/lib/db";

export const getGame = async (gameId : string) => {
    try {
        const  moves = await prisma.move.findMany({where: {gameId}, orderBy:{turnNumber:"asc"}})
        return moves
    } catch (e) {
        console.log(e);
        return [];
    }
}