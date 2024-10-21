import Header from "./components/header";
import SideBar from "./components/sideBar";
import { ReactNode } from "react";

export default function MainTemplete({children}:{children:ReactNode}) {
  return (
    <div className="flex flex-col">
      <Header/>
      <div className="flex flex-row ">
        <SideBar/>
        <div className="p-5">
        {children}
        </div> 
      </div>
    </div>

  );
}
