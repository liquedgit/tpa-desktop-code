import { useNavigate, Link } from "react-router-dom";
import { auth } from "../utils/Firebase";
import { UserData } from "../Type";
import { useState } from "react";

export default function NavbarComponent({ user }: { user: UserData | null }) {
  const navigate = useNavigate();
  const [dropDown, setDropdown] = useState(false);
  let handleSignOut = () => {
    auth.signOut();
    localStorage.setItem("loggedin", "");
    navigate("/");
  };

  let showDropDown = () => {
    setDropdown(true);
  };

  let hideDropDown = () => {
    setDropdown(false);
  };

  return (
    <>
      <div className="w-screen h-10 my-3 flex flex-col">
        <div className="border-t w-full border-gray-300"></div> {/* Top Line */}
        <div className="flex w-full items-center py-2">
          <div>
            <ol className="flex text-gray-500 mx-5">
              <Link to={`/home`}>
                <li className="mr-8">Home</li>
              </Link>
              <Link to={`/jobs`}>
                <li className="mr-8">Jobs</li>
              </Link>
              {user?.role === "adminstaff" && (
                <li
                  className="mr-8"
                  onMouseEnter={showDropDown}
                  onMouseLeave={hideDropDown}
                >
                  <button>Staff Management</button>
                  {dropDown && (
                    <div className="absolute bg-white border border-gray-900 shadow-lg">
                      <Link
                        to={`/newstaff`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Approve New Staff
                      </Link>
                      <Link
                        to={`/deletestaff`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Delete Staff
                      </Link>
                      <Link
                        to={`/deletestaff`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Change Staff Roles
                      </Link>
                    </div>
                  )}
                </li>
              )}
            </ol>
          </div>
          <div className="ml-auto mr-10">
            <button
              onClick={handleSignOut}
              className="border border-black rounded-md py-1 px-2 hover:bg-red-600 hover:text-white transition ease-in-out duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="border-t w-full border-gray-300"></div>
      </div>
    </>
  );
}
