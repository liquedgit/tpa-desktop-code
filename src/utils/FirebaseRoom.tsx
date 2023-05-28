import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./Firebase";
import { Bed, Room } from "../Type";

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
    }));

    const roomWithBeds: Room = {
      ...roomObj,
      beds: bedData,
    };

    roomData.push(roomWithBeds);
  }
  //   console.log(roomData);
  return roomData;
}
