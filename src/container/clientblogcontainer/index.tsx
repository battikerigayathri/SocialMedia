// "use client";
// import Image from "next/image";
// import React, { useEffect } from "react";
// import trail from "../../../public/assets/uploads/menbloger.png";
// import { useLazyQuery } from "@/hook";
// import { serverFetch } from "@/action";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import FeaturedPosts from "./FeaturedPosts";
// import LatestPosts from "./LatestPosts";
// import SingleCard from "./singlecard";
// import { FaThumbtack } from 'react-icons/fa'; // Import the pin icon
// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/header";
// // import Header from "@/components/header";
// const Clientblogview = () => {

//   const [featuredposts, { data, loading, error }] = useLazyQuery(serverFetch);

//   useEffect(() => {
//     featuredposts(
//       `query Docs($where: whereBlogInput, $sort: sortBlogInput) {
//                 listBlogs(where: $where, sort: $sort) {
//                   docs {
//                     author {
//                       id
//                       firstName
//                       lastName
//                     }
//                     slug
//                     createdOn
//                     title
//                     status
//                     description
//                     id
//                     thumbnail {
//                       id
//                       path
//                       altText
//                     }
//                     featured
//                   }
//                 }
//               }`,
//       {
//         sort: {
//           createdOn: "desc",
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

//   const [pinPosts, mypinposts] = useLazyQuery(serverFetch);

//   useEffect(() => {
//     pinPosts(
//       `query Docs($where: whereBlogInput, $sort: sortBlogInput,  $limit: Int!) {
//       listBlogs(where: $where, sort: $sort, limit: $limit) {
//         docs {
//           author {
//             id
//             firstName
//             lastName
//           }
//              slug
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
//           featured
//         }
//       }
//     }
//      `,
//       {
//         sort: {
//           createdOn: "desc",
//         },
//         where: {
//           pin: true,
//           status: "PUBLISH",
//           limit: 50,
//         },
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (mypinposts?.data) {
//       console.log(data, "pinpostsdata");
//     }
//     if (mypinposts?.error) {
//       toast.error(error?.message);
//     }
//   }, [mypinposts?.data, mypinposts?.loading, mypinposts?.error]);

//   // const [latestblogs, mylatestblogs] = useLazyQuery(serverFetch);

//   // useEffect(() => {
//   //   latestblogs(
//   //     `query Docs($where: whereBlogInput, $sort: sortBlogInput, $limit: Int!) {
//   //     listBlogs(where: $where, sort: $sort, limit: $limit) {
//   //       docs {
//   //         author {
//   //           id
//   //           firstName
//   //           lastName
//   //         }
//   //         slug
//   //         createdOn
//   //         title
//   //         status
//   //         description
//   //         id
//   //         thumbnail {
//   //           id
//   //           path
//   //           altText
//   //         }
//   //       }
//   //     }
//   //   }`,
//   //     {
//   //       where: {
//   //         status: "PUBLISH",
//   //       },
//   //       limit: 3,
//   //       sort: {
//   //         createdOn: "asc",
//   //       },
//   //     }
//   //   );
//   // }, []);

//   // useEffect(() => {
//   //   if (mylatestblogs.data) {
//   //     console.log(data, "latestdatabloga");
//   //     if (mylatestblogs.error) {
//   //       toast.error(error?.message);
//   //     }
//   //   }
//   // }, [mylatestblogs.loading, mylatestblogs.data, mylatestblogs.error]);
//   console.log(mypinposts?.data?.listBlogs.docs,"datapinpost")
//   function formatDate({ createdon }: { createdon: any }) {
//     console.log(createdon, "sdf");
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

//   return (
//     <div>
// <div>
//   <Header />
// </div>

//     <div className="flex flex-col">
//       {/* <Header/> */}
//     <div className="p-4 flex flex-row gap-6 bg-gray-100 justify-center mt-12">
//       {/* Pinned Posts Section */}
//       <div className="bg-white rounded-md shadow-md p-4 w-[80%]">
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
//           {mypinposts?.data?.listBlogs.docs.map((item: any) => (
//             // <Link key={item.id} href={item.slug || "#"}>
//             // <Link key={item.id} href={`/user/post/${item.id}-${item.slug || item.title}`}>
//             <Link key={item.id} href={`/user/post/${item.id}`}>

//               <div className="relative group overflow-hidden bg-white rounded-lg shadow-lg ">
//               <div className="absolute top-2 right-2 text-gray-600 bg-white p-1 rounded-full">
//                     <FaThumbtack className="" />
//                   </div>
//                 <Image
//                   className="w-full h-48 object-cover"
//                   src={item?.thumbnail?.path}
//                   alt={item?.title}
//                   height={192}
//                   width={256}
//                 />
//                 <div className="p-4">
//                   <h4 className="text-lg font-semibold truncate">
//                     {item?.title}
//                   </h4>
//                   <div className="text-sm text-gray-500">
//                     {item?.author?.firstName} -{" "}
//                     {formatDate({ createdon: item?.createdOn })}
//                   </div>
//                   <p className="text-sm mt-2 line-clamp-3">
//                     {item?.description}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* <div className="flex flex-col gap-6 w-[25%]">
//         <FeaturedPosts />
//         <LatestPosts />
//       </div> */}
//      </div>
//       <div><Footer /></div>
//     </div>
//     </div>

//   );
// };

// export default Clientblogview;

"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaThumbtack } from "react-icons/fa";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/header";

const Clientblogview = () => {
  const [pinPosts, mypinposts] = useLazyQuery(serverFetch);

  useEffect(() => {
    pinPosts(
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
            category {
            id
            name
          }
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
        sort: { createdOn: "desc" },
        where: { pin: true, status: "PUBLISH" },
        limit: 100, // Set the limit to 100
      }
    );
  }, []);
  function formatCategories(categories: any[]) {
    return Array.isArray(categories)
      ? categories.map((cat) => cat.name).join(", ")
      : "Uncategorized";
  }
  useEffect(() => {
    if (mypinposts?.data) {
      console.log(mypinposts.data, "pinpostsdata");
    }
    if (mypinposts?.error) {
      toast.error(mypinposts.error?.message);
    }
  }, [mypinposts?.data, mypinposts?.loading, mypinposts?.error]);

  function formatDate({ createdon }) {
    const date = new Date(createdon);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col flex-1 p-4 bg-gray-100 mt-12">
        <div className="bg-white rounded-md shadow-md p-4 h-[600px] overflow-y-auto w-[80%] mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mypinposts?.data?.listBlogs.docs.map((item: any) => (
              <Link key={item.id} href={`/user/post/${item.id}`}>
                <div className="relative group overflow-hidden bg-white rounded-lg shadow-lg">
                  <div className="absolute top-2 right-2 text-gray-600 bg-white p-1 rounded-full">
                    <FaThumbtack className="" />
                  </div>
                  <Image
                    className="w-full h-48 object-cover"
                    src={item?.thumbnail?.path}
                    alt={item?.title}
                    height={192}
                    width={256}
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold truncate">
                        {item?.title}
                      </h4>
                      <div className="text-lg text-[green] ml-4">
                        {formatCategories(item?.category)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {item?.author?.firstName} -{" "}
                      {formatDate({ createdon: item?.createdOn })}
                    </div>
                    <p className="text-sm mt-2 line-clamp-3">
                      {item?.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Clientblogview;
