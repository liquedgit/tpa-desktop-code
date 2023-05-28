import { useEffect, useState } from "react";
import { Room, UserData } from "../Type";
import { Card } from "../components/CardComponent";
import HeaderComponent from "../components/HeaderComponent";
import NavbarComponent from "../components/NavbarComponent";
import { GetAllRoomfromFirestore } from "../utils/FirebaseRoom";
import getLoggedin from "../utils/LocalStorage";

export default function HomeView() {
  const loggedin: UserData | null = getLoggedin();
  const [obj, setObj] = useState<Room[] | null>(null);

  useEffect(() => {
    GetAllRoomfromFirestore().then((room: Room[]) => setObj(room));
  }, []);

  return (
    <>
      <HeaderComponent user={loggedin} />
      <NavbarComponent user={loggedin} />
      <div>
        <div className="my-10">
          <h1 className="text-center text-2xl font-bold">Room List</h1>
          <div className="flex justify-end mr-10">
            <button className="border border-black rounded p-2 flex hover:bg-green-200">
              Add new room
            </button>
          </div>
        </div>
        <div className="mx-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {obj &&
            obj.map((room: Room) => {
              return <Card obj={room} />;
            })}
        </div>
      </div>
    </>
  );
}
