"use server"

import {prisma} from "@/lib/db";

export const getGame = async (gameId : string)=> {
    try {
        const game = await prisma.game.findUnique({where : {id : gameId}});
        return game;
    } catch (e) {
        console.log(e);
    }
}