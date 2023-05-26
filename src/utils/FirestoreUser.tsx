import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "./Firebase"
import { UserData } from "../Type"

export async function checkDatafromFirestore(uuid:string){
    let userData : UserData | null = null
    const docSnap = await getDoc(doc(db,'users',uuid))
        if(docSnap.exists()){
            //check account activation
            userData={
                uid: uuid,
                enabled: docSnap.data().enabled,
                role: docSnap.data().role
        }
    }
    return userData
}

export async function pushnewDatatoFirestore(uuid:string, status:boolean, role:string){
    if(status){
        console.log("Pushing data");
        await setDoc(doc(db, 'users', uuid), {
            role: role,
            enabled: false,
            });
    }
}

export function checkValidity(user:any){
    let userData : UserData|null = null;
    if(user){
        checkDatafromFirestore(user.uid).then((data:UserData| null)=>{
            if(data){
                userData = data;
            }
        })
    }

    return userData
}