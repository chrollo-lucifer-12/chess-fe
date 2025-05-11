"use client"

import {Move} from "@prisma/client";
import {useState} from "react";
import {findSrc, initialCells} from "@/lib/definitions";
import Image from "next/image";
import {Button} from "@/components/ui/button";

const ReplayGame = ({moves} : {moves : Move[]}) => {

    const [cells, setCells] = useState(initialCells);
    const [moveNum, setMoveNum] = useState(0);

    function findPiece(x: number, y: number) {
        for (let cell of cells) {
            if (cell.coords.x === x && cell.coords.y === y) {
                return cell.symbol;
            }
        }
        return null;
    }

    function findCell(x: number, y: number) {
        for (let cell of cells) {
            if (cell.coords.x === x && cell.coords.y === y) {
                return cell
            }
        }
        return null;
    }

    function handleNextMove() {
        if (moveNum >= moves.length) return;

        const move = moves[moveNum];

        setCells(prevCells => {
            let newCells = [...prevCells];


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

    return <div className={"flex items-center"}>
        <div className="w-full max-w-2xl h-full max-h-2xl grid grid-cols-8 grid-rows-8 border border-black rounded">
            {Array.from({length: 8}).map((_, row) =>
                Array.from({length: 8}).map((_, col) => {
                    const symbol = findPiece(row, col);
                    const isBlack = (row + col) % 2 === 1;
                    return (
                        <div
                            key={`${row}-${col}`}
                            className={`flex items-center justify-center w-full h-full aspect-square ${isBlack ? "bg-gray-700" : "bg-white"}`}
                        >
                            {symbol && (
                                <Image
                                    src={findSrc(symbol)!}
                                    alt={`${symbol}`}
                                    width={40}
                                    height={40}
                                    className={"cursor-pointer"}

                                />
                            )}
                        </div>
                    );
                })
            )}
        </div>
        <Button onClick={handleNextMove}> > </Button>
    </div>


}

export default ReplayGame