import { Bed, Doctor, PatientData, Room } from "../Type";
import {
  AssignPatientRoomFirestore,
  DeleteBedFromFireStore,
  GetAllRoomfromFirestore,
  MoveBedFromFireStore,
  pushNewBedsRoomtoFirestore,
  pushnewRoomtoFirestore,
} from "../utils/FirebaseRoom";
import toastr from "toastr";

export async function InsertRoomController(
  roomNumber: string,
  roomType: string,
  setRerender: Function,
  rerender: boolean,
  setShowModal: Function
) {
  const regex = /^[A-Z][0-9]\d{3}$/;
  if (regex.test(roomNumber)) {
    await pushnewRoomtoFirestore(roomNumber, roomType);
    setRerender(!rerender);
    setShowModal(false);
    toastr.success("Successfully Added new Room", "Success");
  } else {
    toastr.error("You inputted wrong room number", "Error");
  }
}

export async function MoveBedController(
  obj: Room[] | null,
  setShowModal: Function,
  setRerender: Function,
  rerender: boolean,
  roomid: string,
  targetBed: number,
  targetRoom: string,
  setModalType: Function,
  setnFetch: Function
) {
  if (obj) {
    for (const obj2 of obj) {
      if (obj2.roomid === roomid) {
        if (obj2.beds[targetBed - 1].bedid) {
          // push ke satu lagi
          for (const room2 of obj) {
            if (
              room2.roomid === targetRoom &&
              ((room2.type === "Sharing" && room2.beds.length < 6) ||
                ((room2.type === "Royale" ||
                  room2.type === "VIP" ||
                  room2.type === "Single") &&
                  room2.beds.length < 1) ||
                (room2.type === "Emergency" && room2.beds.length < 12))
            ) {
              //can push
              room2.beds.push(obj2.beds[targetBed - 1]);
              const temp = obj2.beds[targetBed - 1];
              const deletedObj = obj2.beds.indexOf(temp);
              obj2.beds.splice(deletedObj, 1);

              // await firestore
              await MoveBedFromFireStore(roomid, temp.bedid, targetRoom, temp);
              toastr.success("Succesfully Moved bed", "Success");
              setModalType(0);
              setShowModal(false);
              setRerender(!rerender);
              setnFetch(true);
              break;
            }
          }
          break;
        }
      }
    }
  }
}

export async function InsertNewBedController(
  obj: Room[] | null,
  setShowModal: Function,
  setRerender: Function,
  rerender: boolean,
  targetRoom: string
) {
  if (obj) {
    let found = false;

    for (const obj2 of obj) {
      if (obj2.roomid === targetRoom) {
        if (obj2.type === "Sharing") {
          if (obj2.beds.length < 6) {
            await pushNewBedsRoomtoFirestore(targetRoom);
            setShowModal(false);
            setRerender(!rerender);
            found = true;
            break;
          }
        } else if (
          obj2.type === "Single" ||
          obj2.type === "VIP" ||
          obj2.type === "Royale"
        ) {
          if (obj2.beds.length < 1) {
            await pushNewBedsRoomtoFirestore(targetRoom);
            setShowModal(false);
            setRerender(!rerender);
            found = true;
            break;
          }
        } else if (obj2.type === "Emergency") {
          if (obj2.beds.length < 12) {
            await pushNewBedsRoomtoFirestore(targetRoom);
            setShowModal(false);
            setRerender(!rerender);
            found = true;
            break;
          }
        }
      }
    }

    if (!found) {
      toastr.error(
        `Room ${targetRoom} not found / Room is on it's limit`,
        "Error"
      );
    } else {
      toastr.success(`Successfully added new bed to ${targetRoom}`, "Success");
    }
  }
}

let FetchedRoomData: Room[] | null = null;

export async function GetRoomController(
  setObj: Function,
  nFetch: boolean,
  setnFetch: Function,
  query: string,
  obj: Room[] | null
) {
  if (nFetch) {
    if (query.length > 0) {
      //Cari yang sesuai

      //tampung di array lain
      let obj3: Room[] = [];

      if (obj) {
        //looping
        for (const obj2 of obj) {
          if (obj2.roomid.includes(query)) {
            obj3.push(obj2);
          }
        }
        setObj(obj3);
      }
    } else if (query.length == 0) {
      setObj(FetchedRoomData);
    }
    setnFetch(false);
  } else {
    GetAllRoomfromFirestore().then((rooms: Room[]) => {
      setObj(rooms);
      FetchedRoomData = rooms;
    });
  }
}

export async function DeleteBed(
  obj: Room[] | null,
  targetRoomid: string,
  targetBed: number,
  setNFetch: Function,
  setRerender: Function,
  rerender: boolean,
  setObj: Function,
  setShowModal: Function,
  setModalType: Function
) {
  if (obj) {
    for (const obj2 of obj) {
      if (obj2.roomid === targetRoomid) {
        if (obj2.beds[targetBed - 1] && obj2.beds[targetBed - 1].isAvailable) {
          await DeleteBedFromFireStore(
            obj2.beds[targetBed - 1].bedid,
            obj2.roomid
          );
          const objDelete = obj2.beds.indexOf(obj2.beds[targetBed - 1]);
          const returnedObj = obj2.beds.splice(objDelete, 1);
          setObj(returnedObj);
          toastr.success("Deleted Room", "Success");
          setModalType(0);
          setShowModal(false);
          setRerender(!rerender);
          setNFetch(true);
        } else {
          toastr.error(
            "There is no such bed / Bed is currently being used",
            "Error"
          );
        }
        break;
      }
    }
  }
}

export async function AssignPatient(
  patientName: string,
  gender: string,
  age: number,
  sickness: string,
  initDoctor: string,
  targetRoom: Room | null,
  targetBed: Bed | null
) {
  if (patientName.length == 0) {
    toastr.error("Please fill the patient name fields !", "Error");
  } else if (age <= 0) {
    toastr.error("Age cannot be less or equals than 0", "Error");
  } else if (initDoctor.length == 0) {
    toastr.error("Please fill the doctor name !", "Error");
  } else if (sickness.length < 3) {
    toastr.error("Sickness cannot be less than 3", "Error");
  } else {
    const temp: Doctor[] = [];
    const doctor: Doctor = {
      DoctorName: initDoctor,
    };
    temp.push(doctor);
    const pData: PatientData = {
      PatientName: patientName,
      gender: gender,
      age: age,
      sickness: sickness,
      Doctors: temp,
    };
    if (targetBed && targetRoom) {
      await AssignPatientRoomFirestore(
        targetBed.bedid,
        targetRoom.roomid,
        pData
      );
      toastr.success(`Patient assigned to room`);
    }
  }
}
