import { useNavigate } from "react-router-dom";
import { auth } from "../utils/Firebase";

export default function NavbarComponent(){

    const navigate = useNavigate();
    let handleSignOut = () => {
      auth.signOut();
      navigate("/");
    };

    return(
        <>
            <div className="w-screen h-10 mt-3 flex flex-col">
                <div className="border-t w-full border-gray-300"></div> {/* Top Line */}
                <div className="flex w-full items-center py-2">
                    <div>
                        <ol className="flex text-gray-500 mx-5">
                            <li className="mr-8">Home</li>
                            <li className="mr-8">Jobs</li>
                            <li className="mr-8">Room List</li>
                        </ol>
                    </div>
                    <div className="ml-auto mr-10">
                        <button
                            onClick={handleSignOut}
                            className="border border-black rounded-md py-1 px-2 hover:bg-red-600 hover:text-white transition ease-in-out duration-300">
                            Sign Out
                        </button>
                    </div>
                </div>
                <div className="border-t w-full border-gray-300"></div>
            </div>
        </>
    )
}