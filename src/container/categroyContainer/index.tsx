"use client"
import { serverFetch } from "@/action";
import { useLazyQuery } from "@/hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
// const data = [
//   {
//     userName: "Avinash",

//     status: "In-active",
//     subcategory:"",
//     id: "1",
//   },
//   {
//     userName: "Thrinetra",
//     status: "active",
//     subcategory:"",
//     id: "2",
//   },
//   {
//     userName: "Praveen",
//     subcategory:"",
//     status: "active",

//     id: "3",
//   },
// ];
function CategoryContainer() {
  const [Categorylist, { data, error, loading }] = useLazyQuery(serverFetch);
  const router = useRouter();
  useEffect(() => {
    Categorylist(
      `query ListCategorys {
        listCategorys {
          docs {
            name
            status
            updatedOn
            id
          }
        }
      }
      `, {
      cache: 'no-store',
    }
    )
  }, [])


  useEffect(() => {
    if (data) {
      console.log('catlistdata', data)
    }
    console.log('myerror', error)

  }, [data])


  return (
    <div className="flex flex-col w-[calc(100vw-260px)]">
      <div className="flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center">
        <h4 className="text-center font-bold text-[20px]">Category</h4>
        <Link href={`/admin/dashboard/category/nav-tree`}
          className="">
          <button className="bg-green-700 text-white p-2 rounded-md mr-10" >Category Builder</button>
        </Link>
        <Link href={`/admin/dashboard/addcategory`}
          className="">
          <button className="bg-blue-950 text-white p-2 rounded-md">Add</button>
        </Link>
      </div>
      <div className="flex flex-col mt-8 h-[calc(100vh-180px)] overflow-y-auto overflow-x-hidden">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    SnO
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Cat Name
                  </th>

                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Sub Category
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {data?.listCategorys?.docs.map((item: any, index: number) => {
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
                              {item?.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <span
                          className={`inline-flex px-2 text-xs font-semibold leading-5 ${item?.status === "Active"
                            ? "text-green-800 bg-green-100"
                            : "text-orange-800 bg-orange-100"
                            } rounded-full`}
                        >
                          {item?.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <span
                          className={`inline-flex px-2 text-xs font-semibold leading-5 `}
                        >
                          {item?.subcategory}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        <a
                          href={`/admin/dashboard/category/${item?.id}`}
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
    </div>
  );
}

export default CategoryContainer;
