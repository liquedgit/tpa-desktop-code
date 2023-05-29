import { createContext, useEffect, useState } from "react";
import { Room, UserData } from "../Type";
import { Card } from "../components/CardComponent";
import HeaderComponent from "../components/HeaderComponent";
import NavbarComponent from "../components/NavbarComponent";
import { GetAllRoomfromFirestore } from "../utils/FirebaseRoom";
import getLoggedin from "../utils/LocalStorage";
import { ModalAddBeds, ModalComponent } from "../components/ModalComponent";

export default function HomeView() {
  const loggedin: UserData | null = getLoggedin();
  const [obj, setObj] = useState<Room[] | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [isFilter, setIsFilter] = useState(false);

  const HomeContext = createContext(null);

  useEffect(() => {
    // console.log("Rerender");
    if (!isFilter) {
      GetAllRoomfromFirestore().then((room: Room[]) => setObj(room));
    } else {
      setIsFilter(false);
    }
    console.log(obj);
  }, [rerender]);

  let handleAddnewRoom = () => {
    setShowModal(true);
    setModalType(1);
  };

  let handleAddnewBed = () => {
    setShowModal(true);
    setModalType(2);
  };

  let filterRoom = () => {
    if (obj) {
      obj.reverse();
      setRerender(!rerender);
      setIsFilter(true);
    }
  };

  return (
    <>
      <div>
        <HeaderComponent user={loggedin} />
        <NavbarComponent user={loggedin} />
        <div>
          <div className="my-10">
            <h1 className="text-center text-2xl font-bold">Room List</h1>
            <div className="flex">
              <div className="ml-14">
                <button
                  className="border border-black rounded p-2 flex hover:bg-green-200 mr-4"
                  onClick={filterRoom}
                >
                  Filter
                </button>
              </div>
              {loggedin?.role === "adminstaff" && (
                <div className="ml-auto flex mr-14 ">
                  <button
                    className="border border-black rounded p-2 flex hover:bg-green-200 mr-4"
                    onClick={handleAddnewBed}
                  >
                    Add new bed
                  </button>
                  <button className="border border-black rounded p-2 flex hover:bg-green-200 mr-4">
                    Move Bed
                  </button>
                  <button className="border border-black rounded p-2 flex hover:bg-green-200 mr-4">
                    Delete bed
                  </button>
                  <button
                    onClick={handleAddnewRoom}
                    className="border border-black rounded p-2 flex hover:bg-green-200"
                  >
                    Add new room
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mx-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {obj &&
              obj.map((room: Room) => {
                return <Card obj={room} />;
              })}
          </div>
        </div>
      </div>
      {showModal && modalType === 1 && (
        <ModalComponent
          setModalType={setModalType}
          setRerender={setRerender}
          setShowModal={setShowModal}
          rerender={rerender}
        />
      )}
      {showModal && modalType === 2 && (
        <ModalAddBeds
          rerender={rerender}
          obj={obj}
          setShowModal={setShowModal}
          setModalType={setModalType}
          setRerender={setRerender}
        />
      )}
    </>
  );
}
