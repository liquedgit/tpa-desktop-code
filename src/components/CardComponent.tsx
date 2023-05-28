import { Bed, Room } from "../Type";

export function Card({ obj }: { obj: Room }) {
  const obj2: Bed[] = obj.beds;
  return (
    <>
      <div key={obj.roomid} className="bg-gray-300 rounded shadow-lg p-2">
        <div className="flex flex-col items-center">
          <div className="text-center font-bold text-md my-2">
            <h1>{obj.roomid}</h1>
            <h1>{`${obj.type}`}</h1>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {obj2 &&
              obj2.map((bed: Bed, index) => {
                return <RoomCards obj3={bed} index={index} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export function RoomCards({ obj3, index }: { obj3: Bed; index: number }) {
  return (
    <>
      <div
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
