import { useNavigate } from "react-router-dom"
import Button from "../components/Button";


export default function Landing() {

    const  navigate = useNavigate();

    return (
        <div className="flex justify-center items-center">

            <div className="pt-16 max-width-screen-2xl">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex justify-center">
                        <img className="max-w-96 " src="https://res.cloudinary.com/daygfelat/image/upload/v1723225637/standardboard_delkd9.png" alt="" />
                    </div>
                    <div className="text-white text-center mt-16" >

                        
                            <h1 className="text-4xl font-bold">Play Chess Online</h1>
                            <p>Play with your friends</p>
                        

                        <div className="mt-5 flex justify-center">
                            <Button onClick={()=> navigate('/game')}>
                                Play Online
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
