import Image from "next/image";
import Login from "./container/login";
import Forgotpassword from "./container/forgotpassword";

export default function Home() {
  return (
    <div>
    {/* <Login/> */}
    <Forgotpassword/>
    </div>
  );
}
