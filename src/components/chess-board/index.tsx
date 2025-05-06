"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {useSocketState} from "@/lib/store";

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
}

const ChessBoard = ({ initialCells, isStatic, gameId }: ChessBoardProps) => {
    const [cells, setCells] = useState<CellType[]>(initialCells);
    const [selectedPiece, setSelectedPiece] = useState<CellType | null>(null)
    const socket = useSocketState();

    function findSrc(symbol: string) {
        switch (symbol) {
            case "wp": return "/white_pawn.png";
            case "wr": return "/white_rook.png";
            case "wn": return "/white_knight.png";
            case "wb": return "/white_bishop.png";
            case "wq": return "/white_queen.png";
            case "wk": return "/white_king.png";
            case "bp": return "/black_pawn.png";
            case "br": return "/black_rook.png";
            case "bn": return "/black_knight.png";
            case "bb": return "/black_bishop.png";
            case "bq": return "/black_queen.png";
            case "bk": return "/black_king.png";
            default: return null;
        }
    }

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
                    setCells(parsedData.payload.board);
                }
            })
        }
    },[initialCells,isStatic, socket])

    return (
        <div className="w-full max-w-2xl h-full max-h-2xl grid grid-cols-8 grid-rows-8 border border-black rounded">
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