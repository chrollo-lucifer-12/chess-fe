"use client"

import { Move } from "@prisma/client";
import { useState } from "react";
import { findSrc, initialCells } from "@/lib/definitions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    ChevronRight,
    ChevronLeft,
    RotateCcw,
    Play
} from "lucide-react";

const ReplayGame = ({ moves }: { moves: Move[] }) => {
    const [cells, setCells] = useState(initialCells);
    const [moveNum, setMoveNum] = useState(0);

    function findPiece(x: number, y: number) {
        return cells.find(cell => cell.coords.x === x && cell.coords.y === y)?.symbol || null;
    }

    function handleNextMove() {
        if (moveNum >= moves.length) return;

        const move = moves[moveNum];

        setCells(prevCells => {
            let newCells = [...prevCells];

            // Remove piece from source
            newCells = newCells.map(cell => {
                if (cell.coords.x === move.x1 && cell.coords.y === move.y1) {
                    return { ...cell, symbol: null };
                }
                return cell;
            });

            if (move.moveType === "CASTLING_KINGSIDE") {
                const row = moveNum % 2 === 0 ? 7 : 0;
                newCells = newCells.map(cell => {
                    if (cell.coords.x === row && cell.coords.y === 4) {
                        return { ...cell, symbol: null };
                    }
                    if (cell.coords.x === row && cell.coords.y === 7) {
                        return { ...cell, symbol: null };
                    }
                    if (cell.coords.x === row && cell.coords.y === 6) {
                        return { ...cell, symbol: "k" };
                    }
                    if (cell.coords.x === row && cell.coords.y === 5) {
                        return { ...cell, symbol: "r" };
                    }
                    return cell;
                });
            } else if (move.moveType === "CASTLING_QUEENSIDE") {
                const row = moveNum % 2 === 0 ? 7 : 0;
                newCells = newCells.map(cell => {
                    if (cell.coords.x === row && cell.coords.y === 4) {
                        return { ...cell, symbol: null };
                    }
                    if (cell.coords.x === row && cell.coords.y === 0) {
                        return { ...cell, symbol: null };
                    }
                    if (cell.coords.x === row && cell.coords.y === 2) {
                        return { ...cell, symbol: "k" };
                    }
                    if (cell.coords.x === row && cell.coords.y === 3) {
                        return { ...cell, symbol: "r" };
                    }
                    return cell;
                });
            } else {
                newCells = newCells.map(cell => {
                    if (cell.coords.x === move.x2 && cell.coords.y === move.y2) {
                        return {
                            ...cell,
                            symbol: move.promotion ?? move.piece
                        };
                    }
                    return cell;
                });
            }

            return newCells;
        });

        setMoveNum(prev => prev + 1);
    }

    function handlePreviousMove() {
        if (moveNum <= 0) return;

        // Revert to the previous state by resetting to initial cells and replaying moves
        const prevMoveNum = moveNum - 1;
        setCells(initialCells);
        setMoveNum(0);

        // Replay moves up to the previous move
        for (let i = 0; i < prevMoveNum; i++) {
            const move = moves[i];
            setCells(prevCells => {
                let newCells = [...prevCells];

                // Remove piece from source
                newCells = newCells.map(cell => {
                    if (cell.coords.x === move.x1 && cell.coords.y === move.y1) {
                        return { ...cell, symbol: null };
                    }
                    return cell;
                });

                // Handle special move types
                if (move.moveType === "CASTLING_KINGSIDE") {
                    const row = i % 2 === 0 ? 7 : 0;
                    newCells = newCells.map(cell => {
                        if (cell.coords.x === row && cell.coords.y === 4) {
                            return { ...cell, symbol: "k" };
                        }
                        if (cell.coords.x === row && cell.coords.y === 7) {
                            return { ...cell, symbol: "r" };
                        }
                        if (cell.coords.x === row && cell.coords.y === 6) {
                            return { ...cell, symbol: null };
                        }
                        if (cell.coords.x === row && cell.coords.y === 5) {
                            return { ...cell, symbol: null };
                        }
                        return cell;
                    });
                } else if (move.moveType === "CASTLING_QUEENSIDE") {
                    const row = i % 2 === 0 ? 7 : 0;
                    newCells = newCells.map(cell => {
                        if (cell.coords.x === row && cell.coords.y === 4) {
                            return { ...cell, symbol: "k" };
                        }
                        if (cell.coords.x === row && cell.coords.y === 0) {
                            return { ...cell, symbol: "r" };
                        }
                        if (cell.coords.x === row && cell.coords.y === 2) {
                            return { ...cell, symbol: null };
                        }
                        if (cell.coords.x === row && cell.coords.y === 3) {
                            return { ...cell, symbol: null };
                        }
                        return cell;
                    });
                } else {
                    newCells = newCells.map(cell => {
                        if (cell.coords.x === move.x2 && cell.coords.y === move.y2) {
                            return { ...cell, symbol: null };
                        }
                        return cell;
                    });
                }

                return newCells;
            });
        }
    }

    function handleReset() {
        setCells(initialCells);
        setMoveNum(0);
    }

    return (
        <div className="h-screen bg-black flex flex-col items-center justify-center space-y-8 p-4">
            <div className="w-full max-w-2xl bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-8 grid-rows-8 border-4 border-gray-800 rounded-lg">
                    {Array.from({length: 8}).map((_, row) =>
                        Array.from({length: 8}).map((_, col) => {
                            const symbol = findPiece(row, col);
                            const isBlack = (row + col) % 2 === 1;
                            return (
                                <div
                                    key={`${row}-${col}`}
                                    className={`flex items-center justify-center w-full h-full aspect-square 
                                        ${isBlack ? "bg-gray-700" : "bg-white"}`}
                                >
                                    {symbol && (
                                        <Image
                                            src={findSrc(symbol)!}
                                            alt={`${symbol}`}
                                            width={40}
                                            height={40}
                                            className="cursor-pointer"
                                        />
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <Button
                    onClick={handleReset}
                    variant="outline"
                    size="icon"
                    className="bg-gray-800 hover:bg-gray-700 text-white"
                >
                    <RotateCcw className="h-5 w-5" />
                </Button>
                <Button
                    onClick={handlePreviousMove}
                    disabled={moveNum <= 0}
                    variant="outline"
                    size="icon"
                    className="bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-50"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                    onClick={handleNextMove}
                    disabled={moveNum >= moves.length}
                    variant="outline"
                    size="icon"
                    className="bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-50"
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>

            <div className="text-white text-center">
                <p>Move: {moveNum} / {moves.length}</p>
            </div>
        </div>
    );
}

export default ReplayGame;