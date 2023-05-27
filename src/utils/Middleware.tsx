import { onAuthStateChanged } from 'firebase/auth'
import {useState, useEffect} from 'react'
import { auth } from './Firebase'
import { UserData } from '../Type'
import { checkDatafromFirestore } from './FirestoreUser'
import { useNavigate } from 'react-router-dom'



export function UserMiddleware({Component} : {Component:React.ElementType}){
    const [user,setUser] = useState<UserData | null>(null)
    const navigate = useNavigate()
    let userCred = null;

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (userCreds)=>{
            userCred = userCreds
            if(userCreds){
                fetchData(userCreds.uid)
            }
        })
        return()=>{
            unsubscribe();
        }
    }, [])
    

    async function fetchData(uid: string) {
        try {
          const res = await checkDatafromFirestore(uid);
          setUser(res);
          console.log("tes")
        } catch (error) {
          // Handle error
        }
    }

    useEffect(() => {
        console.log(user)
        console.log(userCred)
        if ((!user || !user.enabled) && !userCred) {
            console.log("masuk middleware")
          navigate('/', { replace: true });
        }
    }, [user]);

    if(user && user.enabled){
        return <Component/>
    }
    return null
}