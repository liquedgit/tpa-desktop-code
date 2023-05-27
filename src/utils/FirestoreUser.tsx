import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./Firebase";
import { UserData } from "../Type";

export async function checkDatafromFirestore(uuid: string) {
  let userData: UserData | null = null;
  const docSnap = await getDoc(doc(db, "users", uuid));
  if (docSnap.exists()) {
    //check account activation
    userData = {
      name: docSnap.data().name,
      uid: uuid,
      enabled: docSnap.data().enabled,
      role: docSnap.data().role,
      email: docSnap.data().email,
    };
  }
  return userData;
}

export async function pushnewDatatoFirestore(
  uuid: string,
  status: boolean,
  role: string,
  name: string,
  email: string
) {
  if (status) {
    await setDoc(doc(db, "users", uuid), {
      name: name,
      role: role,
      enabled: false,
      email: email,
    });
  }
}

const usersRef = collection(db, "users");

export const QGETNUUSER = query(usersRef, where("enabled", "==", false));

export async function GET_ALL_UNVERIFIED_USER() {
  const data = await getDocs(QGETNUUSER);
  //   console.log(data.docs);
  const fixedData = data.docs.map((doc) => ({
    uid: doc.id,
    name: doc.data().name,
    role: doc.data().role,
    enabled: doc.data().enabled,
    email: doc.data().email,
  }));
  return fixedData;
}
