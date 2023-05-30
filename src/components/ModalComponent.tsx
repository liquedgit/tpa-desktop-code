import { useContext, useState } from "react";
import { Doctor, Room } from "../Type";
import {
  AssignPatient,
  InsertNewBedController,
  InsertRoomController,
} from "../Controller/RoomController";
import { MyContext } from "../Views/HomeView";

// Modal type 1 = Add room
// Modal type 2 = Add Bed
// Modal type 3 = Add patient
// Modal type 4 = Move bed
// Modal type 5 = delete bed
// Modal type 6 = show patient detail

export function ModalBackdrop({
  setShowModal,
  setRerender,
  setModalType,
  rerender,
  modalType,
  obj,
}: {
  setShowModal: Function;
  setRerender: Function;
  setModalType: Function;
  rerender: boolean;
  modalType: number;
  obj: Room[] | null;
}) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-backdrop absolute inset-0 bg-gray-700 opacity-30"></div>
        {modalType === 1 && (
          <ModalAddRoom
            setModalType={setModalType}
            setRerender={setRerender}
            setShowModal={setShowModal}
            rerender={rerender}
          />
        )}
        {modalType === 2 && (
          <ModalAddBeds
            rerender={rerender}
            obj={obj}
            setShowModal={setShowModal}
            setModalType={setModalType}
            setRerender={setRerender}
          />
        )}
        {modalType === 3 && <ModalAssignPatient />}
        {modalType === 5 && <ModalDeleteBed />}
        {modalType === 6 && <ModalViewPatientDetail />}
      </div>
    </>
  );
}

export function ModalDeleteBed() {
  const { setModalType, setShowModal, targetBed } = useContext(MyContext)!;
  const [RoomId, setRoomId] = useState("");
  const [bednum, setBedNum] = useState(0);
  return (
    <>
      <div className="modal-content bg-white rounded-lg p-6 relative z-10">
        <h1 className="text-xl font-bold mb-4">Delete Bed</h1>
        <div className="flex flex-col my-6 font-bold">
          <input
            type="text"
            className="p-2 border border-black rounded my-2"
            placeholder="Room Id"
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
          />
          <input
            type="number"
            className="p-2 border border-black rounded my-2"
            placeholder="Bed Id"
            onChange={(e) => {
              setBedNum(parseInt(e.target.value));
            }}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              setModalType(0);
              setShowModal(false);
            }}
            className="bg-red-500 hover:bg-red-600  text-white px-4 py-2 rounded mr-4"
          >
            Close
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Add Patient
          </button>
        </div>
      </div>
    </>
  );
}

export function ModalViewPatientDetail() {
  const { setModalType, setShowModal, targetBed } = useContext(MyContext)!;
  // console.log(targetBed?.patient?.Doctors);
  return (
    <>
      <div className="modal-content bg-white rounded-lg p-6 relative z-10">
        <h1 className="text-xl font-bold mb-4">View Patient Details</h1>
        <div className="flex flex-col my-6 font-bold">
          <h1>Name : {targetBed?.patient?.PatientName}</h1>
          <h1>Gender : {targetBed?.patient?.gender}</h1>
          <h1>Age : {targetBed?.patient?.age}</h1>
          <h1>
            Doctor(s) :
            {targetBed?.patient?.Doctors.map((doctor: Doctor) => {
              return <>{doctor.DoctorName}</>;
            })}
          </h1>
          <h1>Sickness : {targetBed?.patient?.sickness}</h1>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              setModalType(0);
              setShowModal(false);
            }}
            className="bg-red-500 hover:bg-red-600  text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export function ModalAssignPatient() {
  const {
    setModalType,
    setRerender,
    setShowModal,
    targetRoom,
    setTargetRoom,
    targetBed,
    rerender,
  } = useContext(MyContext)!;
  const [patientName, setPatientname] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState<number>(0);
  const [sickness, setSickness] = useState("");
  const [initDoctor, setInitDoctor] = useState("");
  return (
    <>
      <div className="modal-content bg-white rounded-lg p-6 relative z-10">
        <h1 className="text-xl font-bold mb-4">
          Assign Patient to {targetRoom?.roomid}
        </h1>
        <div className="flex flex-col my-6">
          <input
            type="text"
            placeholder="Patient Name"
            className="p-2 border border-black rounded my-2"
            onChange={(e) => {
              setPatientname(e.target.value);
            }}
          />
          <select
            onChange={(e) => {
              setGender(e.target.value);
            }}
            className="border border-black rounded-md p-2 mb-2"
            name="gender"
            id="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            required
            type="number"
            className="p-2 border border-black rounded-md mb-2"
            placeholder="Age"
            onChange={(e) => {
              setAge(parseInt(e.target.value));
            }}
          />
          <input
            type="text"
            required
            placeholder="Doctor Name"
            className="p-2 border border-black rounded-md mb-2"
            onChange={(e) => {
              setInitDoctor(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="Sickness"
            className="p-2 border border-black rounded-md"
            onChange={(e) => {
              setSickness(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              setModalType(0);
              setShowModal(false);
            }}
            className="bg-red-500 hover:bg-red-600 mr-4 text-white px-4 py-2 rounded"
          >
            Close
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={async () => {
              await AssignPatient(
                patientName,
                gender,
                age,
                sickness,
                initDoctor,
                targetRoom,
                targetBed
              );
              setShowModal(false);
              setModalType(0);
              setTargetRoom(null);
              setRerender(!rerender);
            }}
          >
            Add Patient
          </button>
        </div>
      </div>
    </>
  );
}

export function ModalAddRoom({
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
    </>
  );
}
