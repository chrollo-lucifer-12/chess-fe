"use client";

import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Image from "next/image";
import {useSocketState} from "@/lib/store";
import {findSrc} from "@/lib/definitions";
import GameoverCard from "@/app/play/_components/gameover-card";


interface CellType {
    coords: {
        x: number
        y: number
    }
    symbol: string
}

interface ChessBoardProps {
    initialCells : CellType[],
    isStatic : boolean
    gameId ?: string
    color ?: string
    setCapturedPieces ?:  Dispatch<SetStateAction<string[]>>
    setOpponentCapturedPieces ?:  Dispatch<SetStateAction<string[]>>
}

const ChessBoard = ({ initialCells, isStatic, gameId, color, setCapturedPieces, setOpponentCapturedPieces }: ChessBoardProps) => {
    const [cells, setCells] = useState<CellType[]>(initialCells);
    const [selectedPiece, setSelectedPiece] = useState<CellType | null>(null)
    const [isOpen, setIsOpen] = useState(true)
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

    useEffect(() => {
        if (socket) {
            socket.addEventListener("message", (e) => {
                const parsedData = JSON.parse(e.data);
                if (parsedData.type === "move_made") {
                    const {capturedPiece} = parsedData.payload;
                    if (capturedPiece) {
                        if (capturedPiece[0] === color) {
                            setOpponentCapturedPieces(prevState => [capturedPiece, ...prevState]);
                        }
                        else {
                            setCapturedPieces(prevState => [capturedPiece, ...prevState]);
                        }
                    }
                    setCells(parsedData.payload.board);
                }
                else if (parsedData.type === "stalemate") {
                    setIsOpen(true);
                }
                else if (parsedData.type === "game_over") {
                    setIsOpen(true);
                }
            })
        }
    },[initialCells,isStatic, socket])

    return (
        <div className="w-full max-w-2xl h-full max-h-2xl grid grid-cols-8 grid-rows-8 border border-black rounded">
            <GameoverCard isOpen={isOpen} setIsOpen={setIsOpen}/>
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