export interface UserData {
  name: string;
  uid: string;
  enabled: false;
  role: string;
  email: string;
  shift: string | null;
}

export interface Doctor {
  DoctorName: string;
}

export interface Patient {
  PatientName: string;
  Doctors: Doctor[];
  age: string;
  gender: string;
  sickness: string;
}

export interface Bed {
  bedid: string;
  isAvailable: boolean;
  usable: boolean;
  patient: Patient | undefined;
}

export interface Room {
  type: string;
  roomid: string;
  beds: Bed[];
}

export interface LoginCreds {
  email: string;
  password: string;
  confirmPass: string;
  role: string;
  name: string;
}

export interface HomeContext {
  loggedin: UserData | null;
  obj: Room[] | null;
  query: string;
  showModal: boolean;
  rerender: boolean;
  modalType: number;
  nFetch: boolean;
  targetRoom: Room | null;
  targetBed: Bed | null;
  setObj: React.Dispatch<React.SetStateAction<Room[] | null>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: React.Dispatch<React.SetStateAction<number>>;
  setnFetch: React.Dispatch<React.SetStateAction<boolean>>;
  setTargetRoom: React.Dispatch<React.SetStateAction<Room | null>>;
  setTargetBed: React.Dispatch<React.SetStateAction<Bed | null>>;
}

export interface PatientData {
  PatientName: string;
  gender: string;
  age: number;
  sickness: string;
  Doctors: Doctor[];
}
