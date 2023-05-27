import { useNavigate } from "react-router-dom"
import { auth } from "../utils/Firebase"
import { UserData } from "../Type";
import logo from "../assets/pngegg.png"

export default function HeaderComponent({user}:{user:UserData | null}){

    const navigate = useNavigate();

    let handleSignOut= ()=>{
        auth.signOut()
        navigate('/')
    }

    return (
        <div>
            <div className="flex
                    justify-between items-center mx-10 mt-4">
                <div className="w-24">
                    <img src={logo} alt=""/>
                </div>
                <div>
                    <h1 className="font-bold">Hello, {user?.name}</h1>
                    <h1 className="font-bold mb-2">Role : {user?.role}</h1>
                    <button onClick={handleSignOut} className="border  border-black rounded-md py-1 px-2 hover:bg-red-600 hover:text-white transition ease-in-out duration-300">Sign Out</button>
                </div>
            </div>
        </div>
    )
}