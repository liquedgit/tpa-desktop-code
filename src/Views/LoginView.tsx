import {Link, useNavigate} from 'react-router-dom'
import {FormEvent, useState} from 'react'
import ButtonComponent from '../components/ButtonComponent'
import {auth} from '../utils/Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserData } from '../Type';
import { checkDatafromFirestore } from '../utils/FirestoreUser';

export default function LoginView(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const navigate = useNavigate();

    let handleOnSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(email.length != 0 && password.length != 0){
            signInWithEmailAndPassword(auth, email, password).then((userCreds)=>{
                checkDatafromFirestore(userCreds.user.uid).then((data:UserData|null)=>{
                    if(data){
                        if(data?.enabled === false){
                            setErrorLogin(true);
                            setErrorMessage("Account is not activated. Please contact Administration Staff");
                        }else{
                            navigate('/home');
                        }
                    }
                })
            }).catch((error)=>{
                console.log(error)
                setErrorMessage("Wrong Email or Password");
                setErrorLogin(true);
            })
        }else{
            setErrorMessage("Please fill all the fields");
            setErrorLogin(true)
        }
    }

    return(
        <>
            <div className="bg-green-100 w-full h-full flex justify-center items-center">
                <div className="bg-white py-6 w-1/4 border border-black rounded-lg">
                    <div className='w-full'>
                        <div className="flex justify-center">
                            <h1 className="font-bold text-2xl">LOGIN</h1>
                        </div>
                        <form onSubmit={handleOnSubmit} className="flex flex-col">
                            <div className="my-3 mt-4 flex justify-center">
                                <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} className="py-2 px-2 w-1/2 border border-gray-300 rounded-lg"/>
                            </div>
                            <div className="my-3 flex justify-center">
                                <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} className="py-2 px-2 w-1/2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="mt-2 text-center">
                                <ButtonComponent name="Login" hoverColor="green-100" />
                                {errorLogin && (
                                    <p id='err' className='text-red-500'>{errorMessage}</p>
                                )}
                                <Link to={`/register`} className='text-xs'>Doesn't have account ? Register Here !</Link>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </>
    )
}