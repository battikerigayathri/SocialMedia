"use client"
import { useState } from "react";
import Image from "next/image";
import { deleteCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
function Header() {
    const [dropdown, setdropdown] = useState(false)
    const router = useRouter();
    return (
        <div className="bg-gray-200">
            <div className=" w-[100%] px-5 bg-gray-200  text-black flex flex-row justify-between items-center py-1">
                {/* <h4>Logo</h4> */}
                <Image src="https://s3.ap-south-1.amazonaws.com/vithiblog.in/webconfig/logo.png" unoptimized alt="logo" height={50} width={200} className="w-auto h-[24px]" />
                <div className="flex flex-row gap-2">
                 <button className="transition duration-200 mx-5 px-3 py-1.5 cursor-pointer font-normal text-sm rounded-lg text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-black focus:ring-opacity-50 ring-inset" onClick={()=>{deleteCookie('Tokenkey'),router.push('/login')}}>
                    Logout
                 </button>
                    
                </div>
                {/* {dropdown && <div className="bg-white text-black ">
                <h5>Logout</h5>
            </div>} */}
            </div>

        </div>
    )
}

export default Header
