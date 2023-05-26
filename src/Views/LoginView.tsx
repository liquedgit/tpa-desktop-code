import {Link} from 'react-router-dom'

export default function LoginView(){
    return(
        <>
            <div className="bg-green-100 w-full h-full flex justify-center items-center">
                <div className="bg-white px-16 border border-black rounded-lg">
                    <div className='my-5'>
                        <div className="flex justify-center">
                            <h1 className="font-bold text-2xl">Login</h1>
                        </div>
                        <form action="" className="flex flex-col">
                            <div className="my-3">
                                <input type="text" placeholder="Username" className="mt-4 px-4 py-2 border border-gray-300 rounded-lg"/>
                            </div>
                            <div className="my-3">
                                <input type="text" placeholder="Password" className="px-4 py-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="mt-2">
                                <div className='flex justify-center mb-3'>
                                    <button className="border border-black rounded-lg py-1 px-6">Login</button>
                                </div>
                                <Link to={`/register`} className='text-xs'>Doesn't have account ? Register Here !</Link>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </>
    )
}