"use server"

import {prisma} from "@/lib/db"

export const getUserGames = async (username : string) => {
    try {
        const games = await prisma.game.findMany({
            where : {
                OR : [
                    {player1 : {user : {username}}},
                    {player2 : {user : {username}}}
                ]
            },
            select : {
                id : true,
                player1 : {
                    select : {
                        user : {
                            select : {
                                username: true
                            }
                        }
                    }
                },
                player2 : {
                    select : {
                        user : {
                            select : {
                                username: true
                            }
                        }
                    }
                }
            }
        })
        const formattedGames = games.map((game)=>{
            return {id : game.id, username1 : game.player1?.user.username, username2 : game.player2?.user.username}
        })
        return formattedGames;
    } catch (e) {
        console.log(e);
        return[]
    }
}

export const getUserInfo = async (username : string) =>  {
    try {
        const user = await prisma.user.findUnique({where : {username}, select : {
            avatarUrl : true,
                username : true
        }});
        return user;
    } catch (e) {
        console.log(e)
    }
}