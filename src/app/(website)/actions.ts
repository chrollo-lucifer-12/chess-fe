"use server"

import {prisma} from "@/lib/db"

export const getLiveGames = async () => {
    try {
        const games = await prisma.game.findMany({
            where : {
                status : "LIVE"
            }
        })
        return games;
    } catch (e) {
        console.log(e);
        return [];
    }
}