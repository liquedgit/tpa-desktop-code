import { auth } from "../utils/Firebase"
import { useState } from "react"
import { UserData } from "../Type"
import { onAuthStateChanged } from "firebase/auth"
import { checkDatafromFirestore } from "../utils/FirestoreUser"
import HeaderComponent from "../components/HeaderComponent"


export default function HomeView(){
    const [user, setUser] = useState<UserData | null>(null)

    onAuthStateChanged(auth, (userCreds)=>{
        if(userCreds){
            checkDatafromFirestore(userCreds?.uid).then((cred)=>{
                setUser(cred)
            })
        }
        
    })

    

    return(
        <>
            <HeaderComponent user={user}/>
        </>
    )
}