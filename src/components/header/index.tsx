"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import CategoryDropdown from "../CategoryDropDown";
import Dropdown from "../CategoryDropDown";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import UserProfile from "@/container/UserProfile";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";

function Header() {
  const [dropdown, setDropdown] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [token, setToken] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const pathName = usePathname();
  const router = useRouter();
  const [getUserProfile, getUserProfileResponse] = useLazyQuery(serverFetch);
  const [imgSrc, setImgSrc] = useState();

  console.log(pathName, "pathname");

  useEffect(() => {
    setToken(getCookie("tokenkey") ? true : false);
    const userId = getCookie("UserId");
    if (userId) {
      setUser(userId);
      console.log("User ID:", userId);
    }
  }, []);
  console.log("User", user);

  useEffect(() => {
    if (user) {
    getUserProfile(
      `
       query GetUser($where: whereUserInput!) {
  getUser(where: $where) {
    profile {
      id
      name
      type
      path
      createdOn
      updatedOn
    }
    id
  }
}
      `,
      {
        where: {
          id: {
            is: user,
          },
        },
      },
      {
        cache: "no-store",
      }
    );
  };
 } ,[user]);

  // useEffect(() => {
  //   if (getUserProfileResponse?.error) {
  //     toast.error("Failed to fetch user data");
  //   }
  //   console.log(getUserProfileResponse?.data, "user profile");
  //   if (getUserProfileResponse) {
  //     setImgSrc(getUserProfileResponse?.data?.getUser?.profile?.path);
  //   }
  // }, [getUserProfileResponse]);

  useEffect(() => {
    if (getUserProfileResponse?.error) {
        toast.error("Failed to fetch user data");
    }
    if (getUserProfileResponse?.data?.getUser?.profile?.path) {
        setImgSrc(getUserProfileResponse.data.getUser.profile.path);
    }
}, [getUserProfileResponse]);


  return (
    <div className="bg-gray-200 ">
      <div className="w-[100%] px-5 bg-gray-200 text-black flex flex-row justify-between items-center py-1 fixed z-50 ">
        <Image
          src={`${"https://s3.ap-south-1.amazonaws.com/vithiblog.in/webconfig/logo.png"}?id=${uuidv4()}`}
          unoptimized
          alt="logo"
          height={50}
          width={200}
          className="w-auto h-[54px]"
        />
        {token && (
          <div
            className="flex flex-row gap-2 w-[50px] h-[50px] rounded-full border-[1px] border-black"
            onClick={() => setDropdown(!dropdown)}
          >
            <div
              className="h-12 w-12 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover"
              onClick={() => setShowProfileCard(true)}
            >
              <Image
                src={imgSrc || ""}
                unoptimized
                alt="logo"
                height={50}
                width={200}
                className="w-[50px] h-[48px] rounded-full"
              />
            </div>
          </div>
        )}
        {/* {dropdown && <div className="bg-white text-black ">
                <h5>Logout</h5>
            </div>} */}
        {/* <div className="h-10 w-10 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')]"> */}
        {/* {dropdown && (
          <div className="drop-down z-10 w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3">
            <ul>
              <div>
                <button className="px-3 py-3 w-96 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400" onClick={() => {setShowProfileCard(true)
                  setDropdown(false);
                }}>
                  Profile
                </button>

              </div>
              <li
                className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400"
                onClick={() => {
                  deleteCookie("tokenkey");
                  deleteCookie("UserId"); 
                  setDropdown(false);
                  router.push("/login");
                  
                }}
              >
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )} */}
      </div>
      {showProfileCard && user && (
        <UserProfile userId={user} onClose={() => setShowProfileCard(false)} />
      )}
    </div>
  );
}

export default Header;

export const CategoryDropdata = [
  {
    name: "Programming",
    link: "https://example.com/programming",
    subCategory: [
      {
        name: "Javascript",
        link: "https://example.com/javascript",
        subCategory: [
          { name: "2.7", link: "https://example.com/javascript/2.7" },
          { name: "3+", link: "https://example.com/javascript/3plus" },
        ],
      },
      {
        name: "Python",
        link: "https://example.com/python",
        subCategory: [
          { name: "2.7", link: "https://example.com/python/2.7" },
          { name: "3+", link: "https://example.com/python/3plus" },
        ],
      },
    ],
  },
];

// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { deleteCookie, getCookie } from "cookies-next";
// import { usePathname, useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";
// import UserProfile from "@/container/UserProfile";

// function Header() {
//   const [dropdown, setDropdown] = useState(false);
//   const [showProfileCard, setShowProfileCard] = useState(false);
//   const [token, setToken] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const pathName = usePathname();
//   const router = useRouter();

//   console.log(pathName, "pathname");

//   useEffect(() => {
//     setToken(getCookie("tokenkey") ? true : false);
//     const userId = getCookie("UserId");
//     if (userId) {
//       setUser(userId);
//       console.log("User ID:", userId);
//     }
//   }, []);

//   return (
//     <div className="bg-gray-200 relative p-1">
//       <div className="w-[100%] px-5 bg-gray-200 text-black flex flex-row justify-between items-center py-1" onClick={() => setShowProfileCard(true)}>
//         <Image
//           src={${"https://s3.ap-south-1.amazonaws.com/vithiblog.in/webconfig/logo.png"}?id=${uuidv4()}}
//           unoptimized
//           alt="logo"
//           height={100}
//           width={400}
//           className="w-auto h-[54px]"
//         />
//     { (pathName !== "/" && token) ?
//                 <div className="flex flex-row gap-2 w-[50px] h-[50px] rounded-full border-[1px] border-black" onClick={()=>setDropdown(!dropdown)}>
//                     {/* {token && <button className="transition duration-200 mx-5 px-3 py-1.5 cursor-pointer font-normal text-sm rounded-lg text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-black focus:ring-opacity-50 ring-inset" >
//                         Logout
//                     </button>} */}
// <div className="h-12 w-12 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')]"></div>
//                 </div>
//                 :<div className="w-[50px] h-[50px] "> </div>}
//                 {/* {dropdown && <div className="bg-white text-black ">
//                 <h5>Logout</h5>
//             </div>} */}
//               {/* <div className="h-10 w-10 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')]"> */}
//         {/* {dropdown && (
//           <div className="drop-down z-10 w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3">
//             <ul>
//               <div>
//                 <button className="px-3 py-3 w-96 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400" >
//                   Profile
//                 </button>

//               </div>

//             </ul>
//           </div>
//         )} */}
//       </div>
//       {showProfileCard && user &&  (
//                 <UserProfile
//                     userId={user}
//                     onClose={() => setShowProfileCard(false)}
//                 />
//             )}
//     </div>
//   );
// }

// export default Header;

// export const CategoryDropdata = [
//   {
//     name: "Programming",
//     link: "https://example.com/programming",
//     subCategory: [
//       {
//         name: "Javascript",
//         link: "https://example.com/javascript",
//         subCategory: [
//           { name: "2.7", link: "https://example.com/javascript/2.7" },
//           { name: "3+", link: "https://example.com/javascript/3plus" },
//         ],
//       },
//       {
//         name: "Python",
//         link: "https://example.com/python",
//         subCategory: [
//           { name: "2.7", link: "https://example.com/python/2.7" },
//           { name: "3+", link: "https://example.com/python/3plus" },
//         ],
//       },
//     ],
//   },
// ];
