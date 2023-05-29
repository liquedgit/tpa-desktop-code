export interface UserData {
  name: string;
  uid: string;
  enabled: false;
  role: string;
  email: string;
  shift: string | null;
}

export interface Bed {
  bedid: string;
  isAvailable: boolean;
  usable: boolean;
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
