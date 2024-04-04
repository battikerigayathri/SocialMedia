"use client"
import { FaCircleUser } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";

function Header() {
    const [dropdown, setdropdown] = useState(false)
    return (
        <div className="bg-gray-200">
            <div className=" w-[100%] px-5 bg-gray-200  text-black flex flex-row justify-between items-center py-2">
                <h4>Logo</h4>
                <div className="flex flex-row gap-2">
                    <FaCircleUser size={20} />
                    <div className="bg-white rounded-sm" onClick={() => setdropdown(!dropdown)}>
                        <FaCaretDown size={20} color="black" />

                    </div>
                    
                </div>
                {/* {dropdown && <div className="bg-white text-black ">
                <h5>Logout</h5>
            </div>} */}
            </div>

        </div>
    )
}

export default Header
