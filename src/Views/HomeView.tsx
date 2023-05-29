import { useEffect, useState } from "react";
import { Room, UserData } from "../Type";
import { RoomCard } from "../components/CardComponent";
import getLoggedin from "../utils/LocalStorage";
import { ModalAddBeds, ModalComponent } from "../components/ModalComponent";
import { PageLayout } from "../components/PageLayout";
import { GetRoomController } from "../Controller/RoomController";

export default function HomeView() {
  const loggedin: UserData | null = getLoggedin();
  const [obj, setObj] = useState<Room[] | null>(null);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [nFetch, setnFetch] = useState(false);

  useEffect(() => {
    GetRoomController(setObj, nFetch, setnFetch, query, obj);
  }, [rerender]);

  let filterRoom = () => {
    if (obj) {
      obj.reverse();
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
                  <button className="border border-black rounded p-2 flex hover:bg-green-200 mr-4">
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
          <div className="mx-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {obj &&
              obj.map((room: Room) => {
                return <RoomCard obj={room} />;
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
