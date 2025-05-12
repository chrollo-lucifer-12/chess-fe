"use client"

import { Game, User } from "@/lib/definitions";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Eye, Trophy, Clock } from "lucide-react";

interface ProfilePageProps {
    games: Game[]
    user: User
}

const ProfilePage = ({ games, user }: ProfilePageProps) => {
    const router = useRouter();

    // Calculate some basic stats
    const totalGames = games.length;
    const wins = games.filter(game =>
        (game.winner === game.username1 && game.username1 === user.username) ||
        (game.winner === game.username2 && game.username2 === user.username)
    ).length;
    const winPercentage = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

    return (
        <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* User Profile Header */}
                <div className="bg-gray-900 rounded-xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <Image
                            src={user.avatarUrl || "/black_king.png"}
                            alt="User avatar"
                            width={150}
                            height={150}
                            className="rounded-full border-4 border-gray-700 object-cover"
                        />
                        <div className="absolute bottom-0 right-0 bg-green-500 w-8 h-8 rounded-full border-4 border-gray-900"></div>
                    </div>
                    <div className="text-center md:text-left space-y-4">
                        <h1 className="text-3xl font-bold">{user.username}</h1>
                        <div className="flex justify-center md:justify-start space-x-6">
                            <div className="flex items-center space-x-2">
                                <Trophy className="text-yellow-500" size={20} />
                                <span>{wins} Wins</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="text-blue-500" size={20} />
                                <span>{totalGames} Total Games</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-green-500 font-bold">{winPercentage}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Games History */}
                <div className="bg-gray-900 rounded-xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-4">
                        Game History
                    </h2>

                    {games.length ? (
                        <div className="space-y-4">
                            {games.map((game) => (
                                <div
                                    key={game.id}
                                    className="bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-gray-700 transition-colors duration-300 cursor-pointer group"
                                    onClick={() => router.push(`/game/${game.id}`)}
                                >
                                    <div className="flex-1 flex items-center space-x-4">
                                        <div className="flex-1">
                                            <p className="font-semibold">{game.username1}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-500">vs</span>
                                            <Eye
                                                className="text-gray-400 group-hover:text-white transition-colors"
                                                size={20}
                                            />
                                        </div>
                                        <div className="flex-1 text-right">
                                            <p className="font-semibold">{game.username2}</p>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        {game.winner && (
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-bold 
                                                    ${game.winner === user.username
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-red-500 text-white'}`}
                                            >
                                                {game.winner === user.username ? 'Won' : 'Lost'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p className="text-lg">No games played yet</p>
                            <p className="text-sm">Start a new game to see your history!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;