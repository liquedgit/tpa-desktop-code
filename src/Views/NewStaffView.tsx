import { UserData } from "../Type";
import HeaderComponent from "../components/HeaderComponent";
import NavbarComponent from "../components/NavbarComponent";
import {
  GET_ALL_UNVERIFIED_USER,
  pushnewDatatoFirestore,
} from "../utils/FirestoreUser";
import getLoggedin from "../utils/LocalStorage";
import { useEffect, useState } from "react";

export default function NewStaffView() {
  const loggedin: UserData | null = getLoggedin();
  const [obj, setObj] = useState<UserData[] | null>(null);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    GET_ALL_UNVERIFIED_USER().then((data: UserData[]) => {
      setObj(data);
    });
    setRerender(false);
  }, [rerender]);

  const assignShift = (obj3: UserData, shift: string) => {
    obj3.shift = shift;
  };

  const handleOnEnable = (obj3: UserData) => {
    pushnewDatatoFirestore(
      obj3.uid,
      true,
      obj3.role,
      obj3.name,
      obj3.email,
      obj3.shift
    ).then(() => {
      setRerender(true);
    });
  };

  return (
    <>
      <HeaderComponent user={loggedin} />
      <NavbarComponent user={loggedin} />
      <h1 className="text-center font-bold text-2xl my-10">
        Staff Verification
      </h1>
      <div className="container mx-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">
                Name
              </th>
              <th className="py-3 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">
                Email
              </th>
              <th className="py-3 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">
                Role
              </th>
              <th className="py-3 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">
                isEnabled
              </th>
              <th className="py-3 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">
                Assign Shift
              </th>
              <th className="py-3 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {obj &&
              obj.map((obj2: UserData) => {
                return (
                  <tr className="" id={obj2.uid}>
                    <td className="py-4 px-6 border-b border-gray-300 text-center">
                      {obj2.name}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-300 text-center">
                      {obj2.email}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-300 text-center">
                      {obj2.role}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-300 text-center">
                      {obj2.enabled ? "True" : "False"}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-300 text-center items-center ">
                      <select
                        name="shift"
                        id="shift"
                        className="mr-2 border border-black rounded-md"
                        onChange={(e) => {
                          assignShift(obj2, e.target.value);
                        }}
                      >
                        <option value="shift1">Shift 1 (5:00 - 13:00)</option>
                        <option value="shift2">Shift 2 (13:00 - 21:00)</option>
                        <option value="shift3">Shift 3 (21:00 - 5:00)</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-300">
                      <div className="text-center">
                        <button
                          onClick={() => {
                            handleOnEnable(obj2);
                          }}
                          className="rounded-md border-black border py-1 px-6 duration-300 hover:bg-green-100 "
                        >
                          Enable
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
