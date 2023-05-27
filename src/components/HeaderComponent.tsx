import { UserData } from "../Type";
import logo from "../assets/pngegg.png";

export default function HeaderComponent({ user }: { user: UserData | null }) {

  return (
    <div>
      <div
        className="flex justify-between items-center mx-10 mt-4">
        <div className="w-24">
          <img src={logo}  />
        </div>
        <div>
          <h1 className="font-bold">Hello, {user?.name}</h1>
          <h1 className="font-bold mb-2">Role : {user?.role}</h1>
          
        </div>
      </div>
    </div>
  );
}