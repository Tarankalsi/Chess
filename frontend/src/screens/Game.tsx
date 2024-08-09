import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

//Move together code repetetion
export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"

export default function Game() {
    const [chess] = useState(new Chess());
    const socket = useSocket();
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false)

    useEffect(() => {

        if (!socket) {
            return
        }
        socket.onmessage = (event) => {

            let message;
            if (typeof event.data === 'string') {
                message = JSON.parse(event.data);
            } else if (event.data instanceof Buffer) {
                message = JSON.parse(event.data.toString('utf-8'));
            } else {
                console.error('Unexpected message format:', event.data);
                return;
            }
            switch (message.type) {
                case INIT_GAME:
                    setBoard(chess.board());
                    setStarted(true)
                    console.log("Game intitialzied") //Handle game initiation1
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move)
                    setBoard(chess.board());
                    console.log("Move made")
                    //Handle chess move
                    break;
                case GAME_OVER:
                    console.log("Game over")
                    //Handle game over
                    break;
                default:
                    break;

            }
        }
        // Clean up WebSocket on component unmount
        return () => {
            socket.onmessage = null;
        };

    }, [socket, chess]);


    if (!socket) {
        return <div>Connecting...</div>
    }



    return (
        <div className="justify-center flex">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">

                    <div className="col-span-4  w-full flex justify-center">
                        <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} />
                    </div>
                    <div className="col-span-2 bg-slate-800  w-full flex justify-center">
                        <div className="pt-12 flex items-center gap-4 flex-col">
                            {!started && <Button onClick={() => {
                                socket.send(JSON.stringify({
                                    type: INIT_GAME
                                }))
                            }}>Play</Button> }
                            {!started && 
                        <h3 className="text-white font-bold mx-8 text-center">Double tap on this button to start the game</h3>
                        }
                        </div>
                        

                    </div>

                </div>
            </div>
        </div>
    )
}
