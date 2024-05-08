"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { log } from "console";

function Header() {
  const [dropdown, setdropdown] = useState(false);
  const [token, setToken] = useState(false);
  const pathName = usePathname();

  const router = useRouter();
  console.log(pathName, "pathname");
  useEffect(() => {
    setToken(getCookie("tokenkey") ? true : false);
  }, []);
  return (
    <div className="bg-gray-200">
      <div className=" w-[100%] px-5 bg-gray-200  text-black flex flex-row justify-between items-center py-1">
        {/* <h4>Logo</h4> */}
        <Image
          src={`${"https://s3.ap-south-1.amazonaws.com/vithiblog.in/webconfig/logo.png"}?id=${uuidv4()}`}
          unoptimized
          alt="logo"
          height={50}
          width={200}
          className="w-auto h-[24px]"
        />
        <div>Categoty</div>
        {pathName !== "/" && token ? (
          <div
            className="flex flex-row gap-2 w-[50px] h-[50px] rounded-full border-[1px] border-black"
            onClick={() => setdropdown(!dropdown)}
          >
            {/* {token && <button className="transition duration-200 mx-5 px-3 py-1.5 cursor-pointer font-normal text-sm rounded-lg text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-black focus:ring-opacity-50 ring-inset" >
                        Logout
                    </button>} */}
          </div>
        ) : (
          <div className="w-[50px] h-[50px] "> </div>
        )}
        {/* {dropdown && <div className="bg-white text-black ">
                <h5>Logout</h5>
            </div>} */}
        {/* <div className="h-10 w-10 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')]"> */}
        {dropdown && (
          <div className="drop-down z-10 w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3">
            <ul>
              <li
                className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400"
                onClick={() => {
                  deleteCookie("tokenkey"),
                    router.push("/login"),
                    setdropdown(false);
                }}
              >
                <span> Logout </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>

    // </div>
  );
}

export default Header;
