import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export default function ChessBoard({ chess, board, socket , setBoard }: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
    setBoard: any;
    chess:any;
}) {

    const [from, setFrom] = useState<null | Square>(null)


    return (

        <div className="text-white-200">
            {board.map((row, i) => {

                return (
                    <div key={i} className="flex">
                        {row.map((square, j) => {

                            const squareRepresentation = String.fromCharCode(97 + j) + (8 - i) as Square;


                            return <div
                                onClick={() => {
                                    if (!from) {
                                        setFrom(squareRepresentation)
                                    } else {

                                        socket.send(JSON.stringify({
                                            type: "move",
                                            payload: {
                                                from,
                                                to: squareRepresentation
                                            }
                                        }))
                                        setFrom(null)
                                        chess.move({
                                             from: from,
                                             to: squareRepresentation
                                        })
                                        setBoard(chess.board())
                                        console.log({
                                            from,
                                            to: squareRepresentation
                                        })
                                    }

                                }
                                }
                                key={j} className={`w-16 h-16 ${(i + j) % 2 === 0 ? 'bg-green-700' : 'bg-white'}`}>
                                <div className="w-full flex justify-center items-center h-full">

                                    {square ? <img className="size-112" src={`/${square?.color === "b"? "b":"w"}${square.type}.png`} /> : null}


                                </div>

                            </div>
                        })}
                    </div>
                )
            })}



        </div>
    )
}
