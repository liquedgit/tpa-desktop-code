import { UserData } from "../Type";
import HeaderComponent from "../components/HeaderComponent";
import NavbarComponent from "../components/NavbarComponent";
import { GET_ALL_UNVERIFIED_USER } from "../utils/FirestoreUser";
import getLoggedin from "../utils/LocalStorage";
import { useEffect, useState } from "react";

export default function NewStaffView() {
  const loggedin: UserData | null = getLoggedin();
  const [obj, setObj] = useState<UserData[] | null>(null);

  useEffect(() => {
    GET_ALL_UNVERIFIED_USER().then((data: UserData[]) => {
      setObj(data);
    });
  }, []);

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
                    <td className="py-4 px-6 border-b border-gray-300">
                      <div className="text-center">
                        <button className="rounded-md border-black border py-1 px-6 duration-300 hover:bg-green-100 ">
                          Enable
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </>
  );
}
