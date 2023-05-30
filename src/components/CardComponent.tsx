import { useContext } from "react";
import { Bed, HomeContext, Room } from "../Type";
import { MyContext } from "../Views/HomeView";

export function RoomCard({ myroom }: { myroom: Room }) {
  const obj2: Bed[] = myroom.beds;

  return (
    <>
      <div key={myroom.roomid} className="bg-gray-300 rounded shadow-lg p-2">
        <div className="flex flex-col items-center">
          <div className="text-center font-bold text-md my-2">
            <h1>{myroom.roomid}</h1>
            <h1>{`${myroom.type}`}</h1>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {obj2 &&
              obj2.map((bed: Bed, index) => {
                return (
                  <BedCards obj3={bed} masterRoom={myroom} index={index} />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export function BedCards({
  obj3,
  index,
  masterRoom,
}: {
  obj3: Bed;
  index: number;
  masterRoom: Room;
}) {
  const {
    setShowModal,
    setModalType,
    setTargetRoom,
    setTargetBed,
    loggedin,
  }: HomeContext = useContext(MyContext)!;

  let assignNewPatient = () => {
    setTargetRoom(masterRoom);
    setTargetBed(obj3);
    setShowModal(true);
    setModalType(3);
  };

  let showPatientDetail = () => {
    setShowModal(true);
    setTargetRoom(masterRoom);
    setTargetBed(obj3);
    setModalType(6);
  };

  return (
    <>
      <div
        onClick={
          obj3.isAvailable &&
          (loggedin?.role === "adminstaff" || loggedin?.role === "nurse")
            ? assignNewPatient
            : !obj3.isAvailable
            ? showPatientDetail
            : undefined
        }
        className={`${
          !obj3.usable
            ? "bg-red-600"
            : obj3.isAvailable
            ? "bg-green-500"
            : "bg-yellow-300"
        } px-6 py-3`}
      >
        {index + 1}
      </div>
    </>
  );
}
