"use client";

import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Image from "next/image";
import {useSocketState} from "@/lib/store";
import {findSrc} from "@/lib/definitions";

export interface CellType {
    coords: {
        x: number
        y: number
    }
    symbol: string
}

interface ChessBoardProps {
    isStatic : boolean
    gameId ?: string
    color ?: string
    setCapturedPieces ?:  Dispatch<SetStateAction<string[]>>
    setOpponentCapturedPieces ?:  Dispatch<SetStateAction<string[]>>
    cells : CellType[]
}

const ChessBoard = ({  isStatic, gameId, color, cells }: ChessBoardProps) => {

    const [selectedPiece, setSelectedPiece] = useState<CellType | null>(null)
    const socket = useSocketState();

    function findPiece(x: number, y: number) {
        for (let cell of cells) {
            if (cell.coords.x === x && cell.coords.y === y) {
                return cell.symbol;
            }
        }
        return null;
    }

    function findCell (x : number, y : number) {
        for (let cell of cells) {
            if (cell.coords.x === x && cell.coords.y === y) {
                return cell
            }
        }
        return null;
    }

    return (
        <div className="w-full max-w-2xl h-full max-h-2xl grid grid-cols-8 grid-rows-8 border border-black rounded">
            {/*<GameoverCard isOpen={isOpen} setIsOpen={setIsOpen}/>*/}
            {Array.from({ length: 8 }).map((_, row) =>
                Array.from({ length: 8 }).map((_, col) => {
                    const symbol = findPiece(row, col);
                    const isBlack = (row + col) % 2 === 1;
                    const cell = findCell(row,col)
                    return (
                        <div
                            key={`${row}-${col}`}
                            className={`flex items-center justify-center w-full h-full aspect-square ${isBlack ? "bg-gray-700" : "bg-white"}`}
                            onClick={() => {
                                if (isStatic) return;
                                if (selectedPiece && socket) {
                                    socket.send(JSON.stringify({
                                        type : "make_move",
                                        gameId,
                                        move : {
                                            from : selectedPiece.coords,

                                            to : {
                                                x : row,
                                                y : col
                                            }
                                        }
                                    }))
                                    setSelectedPiece(null);
                                }
                                else {
                                    if (cell?.symbol) {
                                        setSelectedPiece(cell);
                                    }
                                }
                            }}
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
    );
}

export default ChessBoard;