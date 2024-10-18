// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import trail from "../../../public/assets/uploads/menbloger.png";
// import { useLazyQuery } from "@/hook";
// import { serverFetch } from "@/action";
// import toast from "react-hot-toast";
// import Link from "next/link";

// const LatestPosts = ({ postsPerPage = 3 }) => {
//   const [latestblog, { data, loading, error }] = useLazyQuery(serverFetch);
//   const [latestblogs, mylatestblogs] = useLazyQuery(serverFetch);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     latestblogs(
//       `query Docs($where: whereBlogInput, $sort: sortBlogInput, $limit: Int!) {
//       listBlogs(where: $where, sort: $sort, limit: $limit) {
//         docs {
//           author {
//             id
//             firstName
//             lastName
//           }
//           slug
//           createdOn
//           title
//           status
//           description
//           id
//           thumbnail {
//             id
//             path
//             altText
//           }
//         }
//       }
//     }`,
//       {
//         where: {
//           status: "PUBLISH",
//         },
//         limit: 3,
//         sort: {
//           createdOn: "asc",
//         },
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (mylatestblogs.data) {
//       console.log(data, "latestdatablogs");
//       if (mylatestblogs.error) {
//         toast.error(error?.message);
//       }
//     }
//   }, [mylatestblogs.loading, mylatestblogs.data, mylatestblogs.error]);

//   function formatDate({ createdon }: { createdon: any }) {
//     const date = new Date(createdon);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   }

//   function archivedates({ createdon }: { createdon: any }) {
//     const date = new Date(createdon);
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     const month = monthNames[date.getMonth()];
//     const year = date.getFullYear();
//     return `${month}-${year}`;
//   }

//   const totalPosts = data?.listBlogs.docs.length || 0;
//   const totalPages = Math.ceil(totalPosts / postsPerPage);

//   const handlePageClick = (page: number) => {
//     setCurrentPage(page);
//   };

//   const startIndex = (currentPage - 1) * postsPerPage;
//   const currentPosts = data?.listBlogs.docs.slice(
//     startIndex,
//     startIndex + postsPerPage
//   );
//   return (
//     <div className=" flex flex-row gap-6 bg-gray-100 ">
//       {/* Pinned Posts Section */}

//       {/* Featured and Latest Posts Section */}
//       <div className="flex flex-col gap-6">
//         {/* Featured Posts */}

//         {/* Latest Posts */}
//         <div className="bg-white rounded-md shadow-md p-4 w-96 mt-6 ">
//           <h3 className="text-xl font-semibold mb-4">Latest Posts</h3>
//           <div className="grid grid-cols-1 gap-4 mb-6">
//             {mylatestblogs?.data?.listBlogs.docs.map((item: any) => (
//               <Link key={item.id} href={item.slug || "#"}>
//                 <div className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 ">
//                   <Image
//                     className="w-24 h-24 object-cover rounded"
//                     src={item?.thumbnail?.path}
//                     alt={item?.title}
//                     height={96}
//                     width={96}
//                   />
//                   <div className="flex-1">
//                     <h4 className="text-lg font-semibold truncate">
//                       {item?.title}
//                     </h4>
//                     <div className="text-sm text-gray-500">
//                       {item?.author?.firstName} -{" "}
//                       {formatDate({ createdon: item?.createdOn })}
//                     </div>
//                     <p className="text-sm mt-2 line-clamp-2">
//                       {item?.description}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))}

//             <div className="flex justify-center">
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <button
//                   key={index + 1}
//                   onClick={() => handlePageClick(index + 1)}
//                   className={`px-4 py-2 mx-1 rounded-full ${
//                     currentPage === index + 1
//                       ? "bg-blue-700 text-white"
//                       : "bg-gray-200"
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LatestPosts;


"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import trail from "../../../public/assets/uploads/menbloger.png";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import toast from "react-hot-toast";
import Link from "next/link";

const LatestPosts = () => {
  const [latestblog, { data, loading, error }] = useLazyQuery(serverFetch);
  const [latestblogs, mylatestblogs] = useLazyQuery(serverFetch);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    latestblogs(
      `query Docs($where: whereBlogInput, $sort: sortBlogInput, $limit: Int!) {
      listBlogs(where: $where, sort: $sort, limit: $limit) {
        docs {
          author {
            id
            firstName
            lastName
          }
          slug
          createdOn
          title
          status
          description
          id
          thumbnail {
            id
            path
            altText
          }
        }
      }
    }`,
      {
        where: {
          status: "PUBLISH",
        },
        limit: 3,
        sort: {
          createdOn: "desc",
        },
      }
    );
  }, []);

  useEffect(() => {
    if (mylatestblogs.data) {
      console.log(data, "latestdatablogs");
      if (mylatestblogs.error) {
        toast.error(error?.message);
      }
    }
  }, [mylatestblogs.loading, mylatestblogs.data, mylatestblogs.error]);

  function formatDate({ createdon }: { createdon: any }) {
    const date = new Date(createdon);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function archivedates({ createdon }: { createdon: any }) {
    const date = new Date(createdon);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month}-${year}`;
  }

  const totalPosts = data?.listBlogs.docs.length || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = data?.listBlogs.docs.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <div className="flex flex-row gap-6">
      {/* Pinned Posts Section */}

      {/* Featured and Latest Posts Section */}
      <div className="flex flex-col gap-6">
        {/* Featured Posts */}

        {/* Latest Posts */}
        <div className="bg-white rounded-md shadow-md p-4 w-96 mt-6">
          <h3 className="text-xl font-bold mb-4">Latest Posts</h3>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {mylatestblogs?.data?.listBlogs.docs.map((item: any) => (
              <Link key={item.id} href={`/user/post/${item.id}`}>
                <div className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300">
                  <Image
                    className="w-24 h-24 object-cover rounded"
                    src={item?.thumbnail?.path}
                    alt={item?.title}
                    height={96}
                    width={96}
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold truncate">
                      {item?.title}
                    </h4>
                    <div className="text-sm text-gray-500">
                      {item?.author?.firstName} -{" "}
                      {formatDate({ createdon: item?.createdOn })}
                    </div>
                    <p className="text-sm mt-2 line-clamp-2">
                      {item?.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageClick(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-full ${
                    currentPage === index + 1
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestPosts;
