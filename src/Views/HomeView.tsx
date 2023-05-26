import { useEffect } from "react"
import {auth} from '../utils/Firebase'
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { UserData } from "../Type"
import { checkDatafromFirestore, checkValidity } from "../utils/FirestoreUser"

export default function HomeView(){

    const navigate = useNavigate()

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            let userData : UserData|null = checkValidity(user);
            if(checkValidity(user)){
                if(userData.enabled)
            }
            
        })
    })

    return(
        <>
            <h1>Hello world</h1>
        </>
    )
}