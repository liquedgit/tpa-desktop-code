import { UserData } from "../Type";
import HeaderComponent from "../components/HeaderComponent";
import NavbarComponent from "../components/NavbarComponent";
import getLoggedin from "../utils/LocalStorage";

export default function HomeView() {
  const loggedin: UserData | null = getLoggedin();

  return (
    <>
      <HeaderComponent user={loggedin} />
      <div className="fixed w-full z-10">
        <NavbarComponent user={loggedin} />
      </div>
    </>
  );
}
