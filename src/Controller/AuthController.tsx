import { FormEvent } from "react";
import { LoginCreds, UserData } from "../Type";
import { auth } from "../utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  checkDatafromFirestore,
  pushnewDatatoFirestore,
} from "../utils/FirestoreUser";

// const navigate = useNavigate();

export async function RegisterController(
  e: FormEvent<HTMLFormElement>,
  setErrorLogin: Function,
  setErrorMessage: Function,
  loginCreds: LoginCreds
) {
  e.preventDefault();
  if (
    loginCreds.email.length != 0 &&
    loginCreds.password === loginCreds.confirmPass
  ) {
    createUserWithEmailAndPassword(auth, loginCreds.email, loginCreds.password)
      .then((userCreds) => {
        pushnewDatatoFirestore(
          userCreds.user.uid,
          false,
          loginCreds.role,
          loginCreds.name,
          loginCreds.email,
          null
        ).then(() => {
          // navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
        setErrorLogin(true);
        setErrorMessage("Register Failed");
      });
  } else if (loginCreds.password !== loginCreds.confirmPass) {
    setErrorLogin(true);
    setErrorMessage("Password doesn't match");
  } else {
    setErrorLogin(true);
    setErrorMessage("Please fill in the fields");
  }
}

export async function LoginController(
  e: FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  setErrorLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) {
  e.preventDefault();
  if (email.length != 0 && password.length != 0) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        checkDatafromFirestore(userCreds.user.uid).then(
          (data: UserData | null) => {
            if (data) {
              if (data?.enabled === false) {
                setErrorLogin(true);
                setErrorMessage(
                  "Account is not activated. Please contact Administration Staff"
                );
              } else {
                const loggedinData = JSON.stringify(data);
                setErrorLogin(false);
                // console.log(loggedinData);
                localStorage.setItem("loggedin", loggedinData);
              }
            }
          }
        );
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Wrong Email or Password");
        setErrorLogin(true);
      });
  } else {
    console.log("ASAS");
    setErrorMessage("Please fill all the fields");
    setErrorLogin(true);
  }
}
