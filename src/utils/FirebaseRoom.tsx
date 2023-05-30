import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { Bed, PatientData, Room } from "../Type";

const roomRef = collection(db, "rooms");
const Q_GET_ALL_ROOM = query(roomRef);

export async function GetAllRoomfromFirestore(): Promise<Room[]> {
  const rooms = await getDocs(Q_GET_ALL_ROOM);
  let roomData: Room[] = [];

  for (const room of rooms.docs) {
    const roomObj = {
      roomid: room.id,
      type: room.data().room_type,
    };

    // Fetching beds
    const subQuery = query(collection(room.ref, "beds"));
    const beds = await getDocs(subQuery);
    const bedData: Bed[] = beds.docs.map((bed) => ({
      bedid: bed.id,
      usable: bed.data().usable,
      isAvailable: bed.data().isAvailable,
      patient: bed.data().patient,
    }));

    const roomWithBeds: Room = {
      ...roomObj,
      beds: bedData,
    };

    roomData.push(roomWithBeds);
  }
  // console.log(roomData);
  return roomData;
}

export async function pushnewRoomtoFirestore(roomid: string, type: string) {
  const parentRef = doc(db, "rooms", roomid);
  await setDoc(parentRef, {
    room_type: type,
  });
}

export async function pushNewBedsRoomtoFirestore(roomid: string) {
  const parentRef = doc(db, "rooms", roomid);
  const bedsRef = collection(parentRef, "beds");
  await setDoc(doc(bedsRef), {
    isAvailable: true,
    usable: true,
  });
}

export async function AssignPatientRoomFirestore(
  bedid: string,
  roomid: string,
  newPatient: PatientData
) {
  const parentRef = doc(db, "rooms", roomid);
  const bedsRef = doc(collection(parentRef, "beds"), bedid);
  await setDoc(bedsRef, {
    isAvailable: false,
    usable: true,
    patient: newPatient,
  });
}
