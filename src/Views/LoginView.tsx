import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import { LoginController } from "../Controller/AuthController";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  let handleOnLogin = async (e: any) => {
    e.preventDefault();
    await LoginController(e, email, password, setErrorLogin, setErrorMessage);
    console.log(errorLogin);
  };

  useEffect(() => {
    if (!errorLogin) {
      navigate("/home");
    }
  }, [errorLogin]);

  return (
    <>
      <div className="bg-green-100 w-screen h-screen flex justify-center items-center">
        <div className="bg-white py-6 w-1/4 border border-black rounded-lg">
          <div className="w-full">
            <div className="flex justify-center">
              <h1 className="font-bold text-2xl">LOGIN</h1>
            </div>
            <form onSubmit={(e) => handleOnLogin(e)} className="flex flex-col">
              <div className="my-3 mt-4 flex justify-center">
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
              <div className="mt-2 text-center">
                <ButtonComponent name="Login" hoverColor="green-200" />
                {errorLogin && (
                  <p id="err" className="text-red-500">
                    {errorMessage}
                  </p>
                )}
                <Link to={`/register`} className="text-xs">
                  Doesn't have account ? Register Here !
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
