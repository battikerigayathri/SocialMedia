"use client";
import { serverFetch } from "@/action";
import Breadcrumbs from "@/components/BreadCrumbs";
import { useLazyQuery } from "@/hook";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

type userData = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: string;
  status: string;
};
function UsersContainer() {
  const [Userfun, UserResponse] = useLazyQuery(serverFetch);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [usersData, setUsersData] = useState<userData[]>([]);
  useEffect(() => {
    Userfun(
      `
        query ListUsers($where: whereUserInput, $limit: Int!,$sort: sortUserInput) {
            listUsers(where: $where, limit: $limit,sort: $sort) {
              docs {
                id
                firstName
                lastName
                userName
                email
                role
                status
                createdOn
                updatedOn
              }
              limit
            }
          }
        `,
      {
        where: {
          role: "USER",
        },
        limit: 100,
        sort: {
          createdOn: "desc",
        },
      },
      {
        cache: "no-store",
      }
    );
  }, []);
  useEffect(() => {
    if (UserResponse?.data) {
      console.log(UserResponse?.data);
      setUsersData(UserResponse?.data?.listUsers?.docs);
    }
  }, [UserResponse]);
  useEffect(() => {
    console.log(usersData, "usersData");
  }, [usersData]);
  const router = useRouter();


  const handleCreateUser = () => {
    setIsCreatingUser(true);
    router.push("/admin/dashboard/users/addUser");
  };

  return (
    <div className="flex flex-col w-[calc(100vw-230px)] mt-16">
       <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          
          { label: "Users" },
        ]}
      />
      <div className="pt-5">

     
      <div className="flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center">
        <h4 className="text-center font-bold text-[20px]">Users</h4>
        {/* <button
          className="bg-blue-950 text-white p-2 rounded-md"
          onClick={() => router.push("/admin/dashboard/users/addUser")}
        > 
          Create User
        </button> */}

<button
          className="bg-blue-950 text-white p-2 rounded-md flex items-center"
          onClick={handleCreateUser}
          disabled={isCreatingUser} // Disable button while loading
        >
          {isCreatingUser ? (
            <BeatLoader color="white" size={10} />
          ) : (
            "Create User"
          )}
        </button>


        
      </div>
      {UserResponse?.loading ? (
        <div className="flex flex-row justify-center items-center">
          {" "}
          <BeatLoader color="gray" size={20} />
        </div>
      ) : (
        <div
          className="flex flex-col mt-8 h-[calc(100vh-180px)]"
          style={{ overflowY: "auto", overflowX: "hidden" }}
        >
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      SnO
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      User Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Email
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Role
                    </th>

                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {usersData?.map((item, index) => {
                    return (
                      <tr>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {index + 1}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {item?.userName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 w-[330px] ">
                          {`${item?.firstName} ${item?.lastName}`}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {item?.email}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span
                            className={`inline-flex px-2 text-xs font-semibold leading-5 ${
                              item?.status === "ACTIVE"
                                ? "text-green-800 bg-green-100"
                                : "text-orange-800 bg-orange-100"
                            } rounded-full`}
                          >
                            {item?.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                          <a
                            href={`users/view?edit=false&id=${item?.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
       </div>
    </div>
  );
}

export default UsersContainer;
