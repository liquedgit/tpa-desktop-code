import { UserData } from "../Type";

export default function getLoggedin(): UserData | null {
  let loggedin = localStorage.getItem("loggedin");
  if (loggedin) {
    const obj = JSON.parse(loggedin);
    if (obj) {
      const credsUser: UserData = {
        name: obj.name,
        uid: obj.uid,
        role: obj.role,
        enabled: obj.enabled,
        email: obj.email,
      };

      // console.log(credsUser);
      return credsUser;
    }
  }
  return null;
}
