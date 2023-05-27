import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "./Firebase"
import { UserData } from "../Type"

export async function checkDatafromFirestore(uuid:string){
    let userData : UserData | null = null
    const docSnap = await getDoc(doc(db,'users',uuid))
        if(docSnap.exists()){
            //check account activation
            userData={
                name:docSnap.data().name,
                uid: uuid,
                enabled: docSnap.data().enabled,
                role: docSnap.data().role
        }
    }
    return userData
}

export async function pushnewDatatoFirestore(uuid:string, status:boolean, role:string, name:string){
    if(status){
        await setDoc(doc(db, 'users', uuid), {
            name: name,
            role: role,
            enabled: false,
        });
    }
}

