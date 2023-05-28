import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import ButtonComponent from "../components/ButtonComponent";
import { auth } from "../utils/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { pushnewDatatoFirestore } from "../utils/FirestoreUser";

export default function RegisterView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("Doctor");
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  let handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.length != 0 && password === confPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCreds) => {
          pushnewDatatoFirestore(
            userCreds.user.uid,
            false,
            role,
            name,
            email,
            null
          ).then(() => {
            navigate("/");
          });
        })
        .catch((error) => {
          console.log(error);
          setErrorLogin(true);
          setErrorMessage("Register Failed");
        });
    } else if (password !== confPassword) {
      setErrorLogin(true);
      setErrorMessage("Password doesn't match");
    } else {
      setErrorLogin(true);
      setErrorMessage("Please fill in the fields");
    }
  };

  return (
    <>
      <div className="bg-green-100 w-screen h-screen flex justify-center items-center">
        <div className="bg-white py-6 w-1/4 border border-black rounded-lg">
          <div className="w-full">
            <div className="flex justify-center">
              <h1 className="font-bold text-2xl">Register</h1>
            </div>
            <form onSubmit={handleOnSubmit} className="flex flex-col">
              <div className="my-3 flex justify-center">
                <input
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="name"
                  className="py-2 px-2 w-1/2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="my-3 flex justify-center">
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                  className="py-2 px-2 w-1/2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="my-3 flex justify-center">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="py-2 px-2 w-1/2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="my-3 flex justify-center">
                <input
                  type="password"
                  onChange={(e) => {
                    setConfPassword(e.target.value);
                  }}
                  placeholder="Confirm Password"
                  className="py-2 px-2 w-1/2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="my-3 flex justify-center">
                <label htmlFor="" className="mr-2">
                  Role :
                </label>
                <select
                  name="roles"
                  id="roles"
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  className="border border-black rounded-md "
                >
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="adminstaff">Administration Staff</option>
                  <option value="kitchenstaff">Kitchen Staff</option>
                  <option value="cleaningservice">Cleaning Service</option>
                  <option value="driver">Ambulance Driver</option>
                </select>
              </div>
              <div className="mt-2 text-center">
                <ButtonComponent name="Register" hoverColor="green-100" />
                {errorLogin && <p className="text-red-500">{errorMessage}</p>}
                <Link to={`/`} className="text-xs">
                  Already have account ? Login Here !
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
