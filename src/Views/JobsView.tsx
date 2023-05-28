import HeaderComponent from "../components/HeaderComponent";
import NavbarComponent from "../components/NavbarComponent";
import getLoggedin from "../utils/LocalStorage";

export default function JobsView() {
  const loggedin = getLoggedin();
  return (
    <>
      <HeaderComponent user={loggedin} />
      <NavbarComponent user={loggedin} />
      <div></div>
    </>
  );
}
