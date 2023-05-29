import { useState } from "react";
import { Room } from "../Type";
import {
  InsertNewBedController,
  InsertRoomController,
} from "../Controller/RoomController";

export function ModalComponent({
  setShowModal,
  setRerender,
  setModalType,
  rerender,
}: {
  rerender: boolean;
  setShowModal: Function;
  setRerender: Function;
  setModalType: Function;
}) {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("Sharing");

  const handleOnInsert = async () => {
    await InsertRoomController(
      roomNumber,
      roomType,
      setRerender,
      rerender,
      setShowModal
    );
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-backdrop absolute inset-0 bg-gray-700 opacity-30"></div>
        <div className="modal-content bg-white rounded-lg p-6 relative z-10">
          <h1 className="text-xl font-bold mb-4">Add new room</h1>
          <div className="flex flex-col my-6">
            <input
              type="text"
              placeholder="Room Number"
              className="p-2 border border-black rounded my-2"
              onChange={(e) => {
                setRoomNumber(e.target.value);
              }}
            />
            <select
              name="type"
              id="type"
              className="border border-black rounded-md p-2"
              onChange={(e) => {
                setRoomType(e.target.value);
              }}
            >
              <option value="Sharing">Sharing Room</option>
              <option value="Single">Single Room</option>
              <option value="VIP">VIP Room</option>
              <option value="Royale">Royale Room</option>
              <option value="Emergency">Emergency Room</option>
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                setShowModal(false);
                setModalType(0);
              }}
              className="bg-red-500 hover:bg-red-600 mr-4 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <button
              onClick={handleOnInsert}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function ModalAddBeds({
  setShowModal,
  setModalType,
  setRerender,
  obj,
  rerender,
}: {
  setShowModal: Function;
  setModalType: Function;
  setRerender: Function;
  obj: Room[] | null;
  rerender: boolean;
}) {
  const [targetRoom, setTargetRoom] = useState("");

  let addnewBed = async () => {
    await InsertNewBedController(
      obj,
      setShowModal,
      setRerender,
      rerender,
      targetRoom
    );
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-backdrop absolute inset-0 bg-gray-700 opacity-30"></div>
        <div className="modal-content bg-white rounded-lg p-6 relative z-10">
          <h1 className="text-xl font-bold mb-4">Add new beds</h1>
          <div className="flex flex-col my-6">
            <input
              type="text"
              placeholder="Room Number"
              className="p-2 border border-black rounded my-2"
              onChange={(e) => {
                setTargetRoom(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 mr-4 text-white px-4 py-2 rounded"
              onClick={() => {
                setModalType(0);
                setShowModal(false);
              }}
            >
              Close
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              onClick={addnewBed}
            >
              Add Bed
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
