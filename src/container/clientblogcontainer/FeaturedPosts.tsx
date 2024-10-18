// // "use client";
// // import Image from "next/image";
// // import React, { useEffect } from "react";
// // import trail from "../../../public/assets/uploads/menbloger.png";
// // import { useLazyQuery } from "@/hook";
// // import { serverFetch } from "@/action";
// // import toast from "react-hot-toast";
// // import Link from "next/link";

// // const FeaturedPosts = () => {
// //   const [featuredposts, { data, loading, error }] = useLazyQuery(serverFetch);

// //   useEffect(() => {
// //     featuredposts(
// //       `query Docs($where: whereBlogInput, $sort: sortBlogInput) {
// //                 listBlogs(where: $where, sort: $sort) {
// //                   docs {
// //                     author {
// //                       id
// //                       firstName
// //                       lastName
// //                     }
// //                     slug
// //                     createdOn
// //                     title
// //                     status
// //                     description
// //                     id
// //                     thumbnail {
// //                       id
// //                       path
// //                       altText
// //                     }
// //                     featured
// //                   }
// //                 }
// //               }`,
// //       {
// //         sort: {
// //           createdOn: "asc",
// //         },
// //         where: {
// //           status: "PUBLISH",
// //           featured: true,
// //         },
// //       },
// //       {
// //         cache: "no-store",
// //       }
// //     );
// //   }, []);

// //   useEffect(() => {
// //     if (data) {
// //       console.log(data, "mydata");
// //     }
// //     if (error) {
// //       toast.error(error?.message);
// //     }
// //   }, [data, loading, error]);

// //   function formatDate({ createdon }: { createdon: any }) {
// //     console.log(createdon, "sdf");
// //     const date = new Date(createdon);
// //     const day = String(date.getDate()).padStart(2, "0");
// //     const month = String(date.getMonth() + 1).padStart(2, "0");
// //     const year = date.getFullYear();
// //     return `${day}-${month}-${year}`;
// //   }

// //   function archivedates({ createdon }: { createdon: any }) {
// //     const date = new Date(createdon);
// //     const monthNames = [
// //       "January",
// //       "February",
// //       "March",
// //       "April",
// //       "May",
// //       "June",
// //       "July",
// //       "August",
// //       "September",
// //       "October",
// //       "November",
// //       "December",
// //     ];
// //     const month = monthNames[date.getMonth()];
// //     const year = date.getFullYear();
// //     return `${month}-${year}`;
// //   }

// //   return (
// //     <div className=" flex flex-row gap-6 bg-gray-100">
// //       {/* Pinned Posts Section */}

// //       {/* Featured and Latest Posts Section */}
// //       <div className="flex flex-col gap-6">
// //         {/* Featured Posts */}
// //         <div className="bg-white rounded-md shadow-md p-4 w-96">
// //           <h3 className="text-xl font-semibold mb-4">Featured Posts</h3>
// //           {data?.listBlogs.docs.map((item: any) => (
// //             <Link
// //               key={item.id}
// //               href={item.slug || "#"}
// //               className="flex items-center gap-4 mb-4"
// //             >
// //               <Image
// //                 className="w-24 h-24 object-cover rounded"
// //                 src={item?.thumbnail?.path}
// //                 alt={item?.title}
// //                 height={96}
// //                 width={96}
// //               />
// //               <div>
// //                 <h4 className="text-lg font-semibold truncate">
// //                   {item?.title}
// //                 </h4>
// //                 <div className="text-sm text-gray-500">
// //                   {item?.author?.firstName} -{" "}
// //                   {formatDate({ createdon: item?.createdOn })}
// //                 </div>
// //                 <p className="text-sm mt-2 line-clamp-3">
// //                   {item?.description}
// //                 </p>
// //               </div>
// //             </Link>
// //           ))}
// //         </div>

// //         {/* Latest Posts */}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FeaturedPosts;

// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { useLazyQuery } from "@/hook";
// import { serverFetch } from "@/action";
// import toast from "react-hot-toast";
// import Link from "next/link";

// const FeaturedPosts = ({ postsPerPage = 3 }) => {
//   const [featuredposts, { data, loading, error }] = useLazyQuery(serverFetch);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     featuredposts(
//       `query Docs($where: whereBlogInput, $sort: sortBlogInput) {
//         listBlogs(where: $where, sort: $sort) {
//           docs {
//             author {
//               id
//               firstName
//               lastName
//             }
//             slug
//             createdOn
//             title
//             status
//             description
//             id
//             thumbnail {
//               id
//               path
//               altText
//             }
//             featured
//           }
//         }
//       }`,
//       {
//         sort: {
//           createdOn: "asc",
//         },
//         where: {
//           status: "PUBLISH",
//           featured: true,
//         },
//       },
//       {
//         cache: "no-store",
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (data) {
//       console.log(data, "mydata");
//     }
//     if (error) {
//       toast.error(error?.message);
//     }
//   }, [data, loading, error]);

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

//   // const handlePreviousPage = () => {
//   //   if (currentPage > 1) {
//   //     setCurrentPage(currentPage - 1);
//   //   }
//   // };

//   // const handleNextPage = () => {
//   //   if (currentPage < totalPages) {
//   //     setCurrentPage(currentPage + 1);
//   //   }
//   // };

//   const handlePageClick = (page: number) => {
//     setCurrentPage(page);
//   };

//   const startIndex = (currentPage - 1) * postsPerPage;
//   const currentPosts = data?.listBlogs.docs.slice(
//     startIndex,
//     startIndex + postsPerPage
//   );

//   // const placeholders = Array(postsPerPage - currentPosts.length).fill(null);
//   return (
//     <div className="flex flex-col gap-6 bg-gray-100">
//       <div className="bg-white rounded-md shadow-md p-4 w-full max-w-3xl mx-auto">
//         <h3 className="text-xl font-semibold mb-4">Featured Posts</h3>
//         {currentPosts?.map((item: any) => (
//           <Link
//             key={item.id}
//             href={item.slug || "#"}
//             className="flex items-center gap-4 mb-4"
//           >
//             <Image
//               className="w-24 h-24 object-cover rounded"
//               src={item?.thumbnail?.path}
//               alt={item?.title}
//               height={96}
//               width={96}
//             />
//             <div>
//               <h4 className="text-lg font-semibold truncate">{item?.title}</h4>
//               <div className="text-sm text-gray-500">
//                 {item?.author?.firstName} -{" "}
//                 {formatDate({ createdon: item?.createdOn })}
//               </div>
//               <p className="text-sm mt-2 line-clamp-3">{item?.description}</p>
//             </div>
//           </Link>
//         ))}

//         <div className="flex justify-center mt-4 ">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => handlePageClick(index + 1)}
//               className={`px-3  mx-1 rounded-full ${
//                 currentPage === index + 1
//                   ? "bg-blue-700 text-white"
//                   : "bg-gray-200"
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedPosts;


"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import toast from "react-hot-toast";
import Link from "next/link";

const FeaturedPosts = ({ postsPerPage = 3 }) => {
  const [featuredposts, { data, loading, error }] = useLazyQuery(serverFetch);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    featuredposts(
      `query Docs($where: whereBlogInput, $sort: sortBlogInput) {
        listBlogs(where: $where, sort: $sort) {
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
            featured
          }
        }
      }`,
      {
        sort: {
          createdOn: "desc",
        },
        where: {
          status: "PUBLISH",
          featured: true,
        },
      },
      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data, "mydata");
    }
    if (error) {
      toast.error(error?.message);
    }
  }, [data, loading, error]);

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
    <div className="relative flex flex-col">
      <div className="bg-white rounded-md shadow-md p-4 w-full h-[500px] mx-auto flex-grow mb-4 ">
        <h3 className="text-xl font-bold mb-4">Featured Posts</h3>
        {currentPosts?.map((item: any) => (
          <Link
            key={item.id}
            href={`/user/post/${item.id}`}
            className="flex items-center gap-4 mb-4 border border-transparent hover:border-gray-500 rounded-md p-2"
          >
            <Image
              className="w-24 h-24 object-cover rounded"
              src={item?.thumbnail?.path}
              alt={item?.title}
              height={96}
              width={96}
            />
            <div>
              <h4 className="text-lg font-semibold truncate">{item?.title}</h4>
              <div className="text-sm text-gray-500">
                {item?.author?.firstName} -{" "}
                {formatDate({ createdon: item?.createdOn })}
              </div>
              <p className="text-sm mt-2 line-clamp-3">{item?.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center mb-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`px-3 mx-1 rounded-full ${
              currentPage === index + 1 ? "bg-blue-700 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
