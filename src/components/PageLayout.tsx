import HeaderComponent from "./HeaderComponent";
import NavbarComponent from "./NavbarComponent";

export function PageLayout(props: any) {
  return (
    <>
      <HeaderComponent user={props.user} />
      <NavbarComponent user={props.user} />
    </>
  );
}
