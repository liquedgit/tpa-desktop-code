import { createContext, useEffect, useState } from "react";
import { Bed, HomeContext, Room, UserData } from "../Type";
import { RoomCard } from "../components/CardComponent";
import getLoggedin from "../utils/LocalStorage";
import { ModalBackdrop } from "../components/ModalComponent";
import { PageLayout } from "../components/PageLayout";
import { GetRoomController } from "../Controller/RoomController";

export const MyContext = createContext<HomeContext | undefined>(undefined);

export default function HomeView() {
  const loggedin: UserData | null = getLoggedin();
  const [obj, setObj] = useState<Room[] | null>(null);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [nFetch, setnFetch] = useState(false);
  const [targetRoom, setTargetRoom] = useState<Room | null>(null);
  const [targetBed, setTargetBed] = useState<Bed | null>(null);

  const contextValue: HomeContext = {
    loggedin,
    obj,
    query,
    showModal,
    rerender,
    modalType,
    nFetch,
    targetRoom,
    targetBed,
    setObj,
    setQuery,
    setShowModal,
    setRerender,
    setModalType,
    setnFetch,
    setTargetRoom,
    setTargetBed,
  };

  useEffect(() => {
    GetRoomController(setObj, nFetch, setnFetch, query, obj);
  }, [rerender]);

  let filterRoom = () => {
    if (obj) {
      obj.reverse();
      setnFetch(true);
      setRerender(!rerender);
    }
  };

  return (
    <>
      <div>
        <PageLayout user={loggedin} />
        <div>
          <div className="my-10">
            <h1 className="text-center text-2xl font-bold">Room List</h1>
            <div className="flex">
              <div className="ml-14 flex">
                <input
                  type="text"
                  placeholder="Search room"
                  className="border border-black rounded-md p-2"
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setnFetch(true);
                    setRerender(!rerender);
                  }}
                />
                <button
                  className="border border-black rounded p-2 flex hover:bg-green-200 mx-6"
                  onClick={filterRoom}
                >
                  Filter
                </button>
              </div>
              {loggedin?.role === "adminstaff" && (
                <div className="ml-auto flex mr-14 ">
                  <button
                    className="border border-black rounded p-2 flex hover:bg-green-200 mr-4"
                    onClick={() => {
                      setShowModal(true);
                      setModalType(2);
                    }}
                  >
                    Add new bed
                  </button>
                  <button className="border border-black rounded p-2 flex hover:bg-green-200 mr-4">
                    Move Bed
                  </button>
                  <button
                    className="border border-black rounded p-2 flex hover:bg-green-200 mr-4"
                    onClick={() => {
                      setShowModal(true);
                      setModalType(5);
                    }}
                  >
                    Delete bed
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setModalType(1);
                    }}
                    className="border border-black rounded p-2 flex hover:bg-green-200"
                  >
                    Add new room
                  </button>
                </div>
              )}
            </div>
          </div>
          <MyContext.Provider value={contextValue}>
            <div className="mx-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {obj &&
                obj.map((room: Room) => {
                  return <RoomCard myroom={room} />;
                })}
            </div>
          </MyContext.Provider>
        </div>
      </div>
      <MyContext.Provider value={contextValue}>
        {showModal && (
          <ModalBackdrop
            setShowModal={setShowModal}
            setModalType={setModalType}
            setRerender={setRerender}
            modalType={modalType}
            obj={obj}
            rerender={rerender}
          />
        )}
      </MyContext.Provider>
    </>
  );
}
