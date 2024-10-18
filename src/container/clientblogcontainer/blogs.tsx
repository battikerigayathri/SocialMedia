 

// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { useLazyQuery } from "@/hook";
// import { serverFetch } from "@/action";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import { FaThumbtack } from "react-icons/fa";

// import FeaturedPosts from "./FeaturedPosts";
// import LatestPosts from "./LatestPosts";
// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/header";

// const Blogs = () => {
//   const [
//     featuredposts,
//     { data: featuredData, loading: featuredLoading, error: featuredError },
//   ] = useLazyQuery(serverFetch);
//   const [
//     pinPosts,
//     { data: pinPostsData, loading: pinPostsLoading, error: pinPostsError },
//   ] = useLazyQuery(serverFetch);

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
//     if (featuredData) {
//       console.log(featuredData, "mydata");
//     }
//     if (featuredError) {
//       toast.error(featuredError?.message);
//     }
//   }, [featuredData, featuredLoading, featuredError]);

//   useEffect(() => {
//     pinPosts(
//       `query Docs($where: whereBlogInput, $sort: sortBlogInput) {
//       listBlogs(where: $where, sort: $sort) {
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
//           createdOn: "asc",
//         },
//         where: {
//           pin: true,
//           status: "PUBLISH",
//         },
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (pinPostsData) {
//       console.log(pinPostsData, "pinpostsdata");
//     }
//     if (pinPostsError) {
//       toast.error(pinPostsError?.message);
//     }
//   }, [pinPostsData, pinPostsLoading, pinPostsError]);

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

//   return (
//     <div>
//       <Header />
//       <div className="flex flex-col">
//         <div className="p-4 flex flex-row gap-6 bg-gray-100 justify-center mt-14">
//           {/* Pinned Posts Section */}
//           <div className="bg-white rounded-md shadow-md p-8 w-[60%] ">
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 h-[30%] mt-8 ">
//               {pinPostsData?.listBlogs.docs.slice(0, 3).map((item: any) => (
//                 <Link key={item.id} href={`/user/post/${item.id}`}>
//                   <div className="relative group overflow-hidden bg-white rounded-lg shadow-lg h-full hover:scale-105 ease-in duration-300 flex flex-col">
//                     <div className="absolute top-2 right-2 text-gray-600 bg-white p-1 rounded-full">
//                       <FaThumbtack className="" />
//                     </div>
//                     <Image
//                       className="w-full h-98 object-cover"
//                       src={item?.thumbnail?.path}
//                       alt={item?.title}
//                       height={192}
//                       width={256}
//                     />
//                     <div className="p-4 mt-4 flex-grow">
//                       <h4 className="text-xl font-bold truncate">
//                         {item?.title}
//                       </h4>
//                       <div className="text-sm text-gray-600 mt-2">
//                         {item?.author?.firstName} -{" "}
//                         {formatDate({ createdon: item?.createdOn })}
//                       </div>
//                       <p className="text-md mt-2 line-clamp-3">
//                         {item?.description}
//                       </p>
//                     </div>
//                     <div className="mt-auto text-center p-4">
//                       <Link href={`/user/post/${item.id}`}>
//                         <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
//                           Read More
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//             <div className="mt-8 text-center">
//               <Link href={("/allblogs")}>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-md ">
//                   View All
//                 </button>
//               </Link>
//             </div>
//           </div>

//           <div className="flex flex-col gap-6 w-[25%]">
//             <FeaturedPosts />
//             <LatestPosts />
//           </div>
//         </div>
//       </div>
//       <div><Footer /></div>
//     </div>
//   );
// };

// export default Blogs;

// "use client";
// import Image from "next/image";
// import React, { useEffect } from "react";
// import { useLazyQuery } from "@/hook";
// import { serverFetch } from "@/action";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import { FaThumbtack } from "react-icons/fa";

// import FeaturedPosts from "./FeaturedPosts";
// import LatestPosts from "./LatestPosts";
// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/header";

// const Blogs = () => {
//   const [featuredposts, { data: featuredData, loading: featuredLoading, error: featuredError }] = useLazyQuery(serverFetch);
//   const [pinPosts, { data: pinPostsData, loading: pinPostsLoading, error: pinPostsError }] = useLazyQuery(serverFetch);

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
//                     categories
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
//                     category {
//                       id
//                       name
//                     }
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
//     if (featuredData) {
//       console.log(featuredData, "mydata");
//     }
//     if (featuredError) {
//       toast.error(featuredError?.message);
//     }
//   }, [featuredData, featuredLoading, featuredError]);

//   useEffect(() => {
//     pinPosts(
//       `query Docs($where: whereBlogInput, $sort: sortBlogInput) {
//       listBlogs(where: $where, sort: $sort) {
//         docs {
//           author {
//             id
//             firstName
//             lastName
//           }
//           slug
//           createdOn
//           category {
//             id
//             name
//           }
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
//     }`,
//       {
//         sort: {
//           createdOn: "desc",
//         },
//         where: {
//           pin: true,
//           status: "PUBLISH",
//         },
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (pinPostsData) {
//       console.log(pinPostsData, "pinpostsdata");
//     }
//     if (pinPostsError) {
//       toast.error(pinPostsError?.message);
//     }
//   }, [pinPostsData, pinPostsLoading, pinPostsError]);

//   function formatDate({ createdon }: { createdon: any }) {
//     const date = new Date(createdon);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   }

//   return (
//     <div>
//       <Header />
//       <div className="flex flex-col">
//         <div className="p-4 flex flex-row gap-6 bg-gray-100 justify-center mt-14">
//           {/* Pinned Posts Section */}
//           <div className="bg-white rounded-md shadow-md p-8 w-[60%] flex flex-col ">
//             <div className="grid grid-cols-1 gap-x-4 gap-y-28 md:grid-cols-2 lg:grid-cols-3 mt-8">
//               {pinPostsData?.listBlogs.docs.slice(0, 6).map((item: any) => {
//                 // Handle category array or object
//                 const categoryNames = Array.isArray(item.category)
//                   ? item.category.map((cat: any) => cat.name).join(", ")
//                   : item.category?.name || "Uncategorized";

//                 return (
//                   <Link key={item.id} href={`/user/post/${item.id}`}>
//                     <div className="relative group overflow-hidden bg-white rounded-lg shadow-lg h-[120%] hover:scale-105 ease-in duration-300">
//                       <div className="absolute top-2 right-2 text-gray-600 bg-white p-1 rounded-full">
//                         <FaThumbtack />
//                       </div>
//                       <Image
//                         className="w-full h-98 object-cover"
//                         src={item?.thumbnail?.path}
//                         alt={item?.title}
//                         height={192}
//                         width={256}
//                       />
//                       <div className="p-4 mt-4">
//                         <div className="flex flex-row justify-between">

//                         <h4 className="text-xl font-bold truncate">
//                           {item?.title}
//                         </h4>
//                         <div>
//                           <h4 className="text-xl font-bold truncate text-[green]">
//                             {categoryNames}
//                           </h4>
//                         </div>
//                         </div>
//                         <div className="text-sm text-gray-600 mt-2">
//                           {item?.author?.firstName} -{" "}
//                           {formatDate({ createdon: item?.createdOn })}
//                         </div>
//                         <p className="text-md mt-2 line-clamp-3">
//                           {item?.description}
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>
//             <div className="mt-32 text-center">
//               <Link href="/allblogs">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
//                   View All
//                 </button>
//               </Link>
//             </div>
//           </div>

//           <div className="flex flex-col gap-6 w-[25%]">
//             <FeaturedPosts />
//             <LatestPosts />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Blogs;


// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { useLazyQuery } from "@/hook";
// import { serverFetch } from "@/action";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import { FaThumbtack } from "react-icons/fa";

// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/header";

// const Blogs = () => {
//   const [featuredposts, { data: featuredData, loading: featuredLoading, error: featuredError }] = useLazyQuery(serverFetch);
//   const [pinPosts, { data: pinPostsData, loading: pinPostsLoading, error: pinPostsError }] = useLazyQuery(serverFetch);
//   const [latestblogs, { data: latestData, loading: latestLoading, error: latestError }] = useLazyQuery(serverFetch);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 3;

//   useEffect(() => {
//     featuredposts(
//      `query Docs($where: whereBlogInput, $sort: sortBlogInput) {
//         listBlogs(where: $where, sort: $sort) {
//           docs {
//             author {
//               id
//               firstName
//               lastName
//             }
//             slug
//             createdOn
//             categories
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
//             category {
//               id
//               name
//             }
//           }
//         }
//       }`,
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
//     if (featuredData) {
//       console.log(featuredData, "mydata");
//     }
//     if (featuredError) {
//       toast.error(featuredError?.message);
//     }
//   }, [featuredData, featuredLoading, featuredError]);

//   useEffect(() => {
//     pinPosts(
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
//             category {
//               id
//               name
//             }
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
//           createdOn: "desc",
//         },
//         where: {
//           pin: true,
//           status: "PUBLISH",
//         },
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (pinPostsData) {
//       console.log(pinPostsData, "pinpostsdata");
//     }
//     if (pinPostsError) {
//       toast.error(pinPostsError?.message);
//     }
//   }, [pinPostsData, pinPostsLoading, pinPostsError]);

//   useEffect(() => {
//     latestblogs(
//       `query Docs($where: whereBlogInput, $sort: sortBlogInput, $limit: Int!) {
//         listBlogs(where: $where, sort: $sort, limit: $limit) {
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
//           }
//         }
//       }`,
//       {
//         where: {
//           status: "PUBLISH",
//         },
//         limit: postsPerPage,
//         sort: {
//           createdOn: "desc",
//         },
//       }
//     );
//   }, [currentPage]);

//   useEffect(() => {
//     if (latestData) {
//       console.log(latestData, "latestdatablogs");
//     }
//     if (latestError) {
//       toast.error(latestError?.message);
//     }
//   }, [latestData, latestLoading, latestError]);

//   function formatDate({ createdon }: { createdon: any }) {
//     const date = new Date(createdon);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   }

//   const totalPosts = latestData?.listBlogs.docs.length || 0;
//   const totalPages = Math.ceil(totalPosts / postsPerPage);

//   const handlePageClick = (page: number) => {
//     setCurrentPage(page);
//   };

//   const startIndex = (currentPage - 1) * postsPerPage;
//   const currentPosts = latestData?.listBlogs.docs.slice(
//     startIndex,
//     startIndex + postsPerPage
//   );

//   return (
//     <div>
//       <Header />
//       <div className="flex flex-col">
//         <div className="p-4 flex flex-row gap-6 bg-gray-100 justify-center mt-14">
//           {/* Pinned Posts Section */}
//           <div className="bg-white rounded-md shadow-md p-8 w-[60%] flex flex-col">
//             <div className="grid grid-cols-1 gap-x-4 gap-y-28 md:grid-cols-2 lg:grid-cols-3 mt-8">
//               {pinPostsData?.listBlogs.docs.slice(0, 6).map((item: any) => {
//                 const categoryNames = Array.isArray(item.category)
//                   ? item.category.map((cat: any) => cat.name).join(", ")
//                   : item.category?.name || "Uncategorized";

//                 return (
//                   <Link key={item.id} href={`/user/post/${item.id}`}>
//                     <div className="relative group overflow-hidden bg-white rounded-lg shadow-lg h-[120%] hover:scale-105 ease-in duration-300">
//                       <div className="absolute top-2 right-2 text-gray-600 bg-white p-1 rounded-full">
//                         <FaThumbtack />
//                       </div>
//                       <Image
//                         className="w-full h-98 object-cover"
//                         src={item?.thumbnail?.path}
//                         alt={item?.title}
//                         height={192}
//                         width={256}
//                       />
//                       <div className="p-4 mt-4">
//                         <div className="flex flex-row justify-between">
//                           <h4 className="text-xl font-bold truncate">
//                             {item?.title}
//                           </h4>
//                           <div>
//                             <h4 className="text-xl font-bold truncate text-[green]">
//                               {categoryNames}
//                             </h4>
//                           </div>
//                         </div>
//                         <div className="text-sm text-gray-600 mt-2">
//                           {item?.author?.firstName} -{" "}
//                           {formatDate({ createdon: item?.createdOn })}
//                         </div>
//                         <p className="text-md mt-2 line-clamp-3">
//                           {item?.description}
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>
//             <div className="mt-32 text-center">
//               <Link href="/allblogs">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
//                   View All
//                 </button>
//               </Link>
//             </div>
//           </div>

//           <div className="flex flex-col gap-6 w-[25%]">
//             {/* Latest Posts Section */}
//             <div className="bg-white rounded-md shadow-md p-4 w-96 mt-6">
//               <h3 className="text-xl font-bold mb-4">Latest Posts</h3>
//               <div className="grid grid-cols-1 gap-4 mb-6">
//                 {currentPosts?.map((item: any) => (
//                   <Link key={item.id} href={`/user/post/${item.id}`}>
//                     <div className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300">
//                       <Image
//                         className="w-24 h-24 object-cover rounded"
//                         src={item?.thumbnail?.path}
//                         alt={item?.title}
//                         height={96}
//                         width={96}
//                       />
//                       <div className="flex-1">
//                         <h4 className="text-lg font-semibold truncate">
//                           {item?.title}
//                         </h4>
//                         <div className="text-sm text-gray-500">
//                           {item?.author?.firstName} -{" "}
//                           {formatDate({ createdon: item?.createdOn })}
//                         </div>
//                         <p className="text-sm mt-2 line-clamp-2">
//                           {item?.description}
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//               <div className="flex justify-center mt-4">
//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <button
//                     key={index + 1}
//                     onClick={() => handlePageClick(index + 1)}
//                     className={`px-4 py-2 mx-1 rounded-full ${
//                       currentPage === index + 1
//                         ? "bg-blue-700 text-white"
//                         : "bg-gray-200"
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Featured Posts Section */}
//             <div className="bg-white rounded-md shadow-md p-4 w-96 mt-6">
//               <h3 className="text-xl font-bold mb-4">Featured Posts</h3>
//               <div className="grid grid-cols-1 gap-4">
//                 {featuredData?.listBlogs.docs.map((item: any) => (
//                   <Link key={item.id} href={`/user/post/${item.id}`}>
//                     <div className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300">
//                       <Image
//                         className="w-24 h-24 object-cover rounded"
//                         src={item?.thumbnail?.path}
//                         alt={item?.title}
//                         height={96}
//                         width={96}
//                       />
//                       <div className="flex-1">
//                         <h4 className="text-lg font-semibold truncate">
//                           {item?.title}
//                         </h4>
//                         <div className="text-sm text-gray-500">
//                           {item?.author?.firstName} -{" "}
//                           {formatDate({ createdon: item?.createdOn })}
//                         </div>
//                         <p className="text-sm mt-2 line-clamp-2">
//                           {item?.description}
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Blogs;


// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { useLazyQuery } from "@/hook";
// import { serverFetch } from "@/action";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import { FaThumbtack } from "react-icons/fa";
// import Header from "@/components/header";
// import Footer from "@/components/Footer/Footer";
// import LatestPosts from "./LatestPosts";
// import FeaturedPosts from "./FeaturedPosts";

// const Blogs = () => {
//   const [displayPinned, setDisplayPinned] = useState(true);
//   const [pinPosts, { data: pinPostsData, loading: pinPostsLoading, error: pinPostsError }] = useLazyQuery(serverFetch);
//   const [allPosts, { data: allPostsData, loading: allPostsLoading, error: allPostsError }] = useLazyQuery(serverFetch);

//   useEffect(() => {
//     // Fetch pinned posts
//     pinPosts(
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
//             category {
//               id
//               name
//             }
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
//           createdOn: "desc",
//         },
//         where: {
//           pin: true,
//           status: "PUBLISH",
//         },
//       }
//     );

//     // Fetch all other blog posts
//     allPosts(
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
//             category {
//               id
//               name
//             }
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
//           createdOn: "desc",
//         },
//         where: {
//           status: "PUBLISH",
//         },
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (pinPostsError) {
//       toast.error(pinPostsError?.message);
//     }
//     if (allPostsError) {
//       toast.error(allPostsError?.message);
//     }
//   }, [pinPostsError, allPostsError]);

//   const postsToDisplay = displayPinned
//   ? (allPostsData?.listBlogs?.docs || []).sort((a: any, b: any) => b.pin - a.pin)
//   : (allPostsData?.listBlogs?.docs || []).filter((post: any) => !post.pin);

//   function formatCategories(categories: any[]) {
//     return Array.isArray(categories)
//       ? categories.map((cat) => cat.name).join(", ")
//       : "Uncategorized";
//   }
//   function formatDate({ createdon }: { createdon: any }) {
//     const date = new Date(createdon);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   }

//   return (
//     <div>
//       <Header />
//       {/* <div className="flex flex-row w-[75%]"> */}
//       <div className="p-4 flex flex-row gap-6 bg-gray-100 justify-center pt-24   ">
//         <div className="bg-white rounded-md shadow-md p-8 flex flex-row w-[75%]  pt-24 ">
//             <div className="flex flex-col"> 


//           <h3 className="text-2xl font-bold mb-4">All Blogs</h3>

//           <div className="flex mb-4">
//               <button
//                 onClick={() => setDisplayPinned(true)}
//                 className={`px-4 py-2 mr-2 ${displayPinned ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//               >
//                 Pinned Posts
//               </button>
//               <button
//                 onClick={() => setDisplayPinned(false)}
//                 className={`px-4 py-2 ${!displayPinned ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//               >
//                 All Posts
//               </button>
//             </div>
//             <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
//               {postsToDisplay.map((item: any) => {
//                 return (
//                   <Link key={item.id} href={`/user/post/${item.id}`}>
//                     <div className="relative group overflow-hidden bg-white rounded-lg shadow-lg hover:scale-105 ease-in duration-300">
//                       {item.pin && (
//                         <div className="absolute top-2 right-2 text-gray-600 bg-white p-1 rounded-full">
//                           <FaThumbtack />
//                         </div>
//                     )}
//                     <Image
//                       className="w-full h-60 object-contain"
//                       src={item?.thumbnail?.path}
//                       alt={item?.title}
//                       height={240}
//                       width={320}
//                     />
//                     <div className="p-4">
//                     <div className="flex flex-row justify-between">

// <h1 className="text-2xl font-semibold mt-4">{item.title}</h1>
// <div className="text-lg text-[white] bg-green-600 ml-4">
//                 {formatCategories(item?.category)}
//               </div>
// </div>
//                       <div className="text-sm text-gray-600 mt-2">
//                         {item?.author?.firstName} -{" "}
//                         {formatDate({ createdon: item?.createdOn })}
//                       </div>
//                       <p className="text-sm mt-2 line-clamp-3">
//                         {item?.description}
//                       </p>
//                     </div>
//                   </div>
                  
//                 </Link>
//               );
//             })}
//           </div>
//             </div>
//         </div>
       
//            <div className="flex flex-col gap-6 w-[25%]">
//              <FeaturedPosts />
//              <LatestPosts />
//            </div>
//       </div>
//       {/* </div> */}
//       <Footer />
//     </div>
//   );
// };

// export default Blogs;







// iupdated codee


"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaThumbtack } from "react-icons/fa";
import Header from "@/components/header";
import Footer from "@/components/Footer/Footer";
import LatestPosts from "./LatestPosts";
import FeaturedPosts from "./FeaturedPosts";

const Blogs = () => {
  const [displayPinned, setDisplayPinned] = useState(true);
  const [pinPosts, { data: pinPostsData, loading: pinPostsLoading, error: pinPostsError }] = useLazyQuery(serverFetch);
  const [allPosts, { data: allPostsData, loading: allPostsLoading, error: allPostsError }] = useLazyQuery(serverFetch);

  useEffect(() => {
    // Fetch pinned posts
    pinPosts(
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
            category {
              id
              name
            }
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
            pin
          }
        }
      }`,
      {
        sort: {
          createdOn: "desc",
        },
        where: {
          status: "PUBLISH",
        },
      }
    );

    // Fetch all other blog posts
    allPosts(
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
            category {
              id
              name
            }
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
            pin
          }
        }
      }`,
      {
        sort: {
          createdOn: "desc",
        },
        where: {
          status: "PUBLISH",
        },
      }
    );
  }, []);

  useEffect(() => {
    if (pinPostsError) {
      toast.error(pinPostsError?.message);
    }
    if (allPostsError) {
      toast.error(allPostsError?.message);
    }
  }, [pinPostsError, allPostsError]);
  const pinnedPosts = (allPostsData?.listBlogs?.docs || []).filter((post: any) => post.pin);
  const otherPosts = (allPostsData?.listBlogs?.docs || []).filter((post: any) => !post.pin);

  const postsToDisplay = [...pinnedPosts, ...otherPosts];

  // const pinnedPosts = pinPostsData?.listBlogs?.docs || [];
  // const otherPosts = (allPostsData?.listBlogs?.docs || []).filter((post: any) => !post.pin);

  // const postsToDisplay = displayPinned
  //   ? [...pinnedPosts, ...otherPosts]
  //   : [...pinnedPosts, ...otherPosts];

  // const pinnedPosts = (allPostsData?.listBlogs?.docs || []).filter((post: any) => post.pin);
  // const otherPosts = (allPostsData?.listBlogs?.docs || []).filter((post: any) => !post.pin);

  // const postsToDisplay = displayPinned ? pinnedPosts : otherPosts;

  function formatCategories(categories: any[]) {
    return Array.isArray(categories)
      ? categories.map((cat) => cat.name).join(", ")
      : "Uncategorized";
  }

  function formatDate({ createdon }: { createdon: any }) {
    const date = new Date(createdon);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div>
      <Header />
      <div className="p-4 flex flex-row gap-6 bg-gray-100 justify-center pt-24">
        <div className="bg-white rounded-md shadow-md p-8 flex flex-row w-[75%] pt-24">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4">All Blogs</h3>

            {/* <div className="flex mb-4">
              <button
                onClick={() => setDisplayPinned(true)}
                className={`px-4 py-2 mr-2 ${
                  displayPinned ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                Pinned Posts
              </button>
              <button
                onClick={() => setDisplayPinned(false)}
                className={`px-4 py-2 ${
                  !displayPinned ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                All Posts
              </button>
            </div> */}

            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {postsToDisplay.map((item: any) => (
                // <Link key={item.title} href={`/user/post/${encodeURIComponent(item.title)}`}>
                <Link key={item.id} href={`/user/post/${item.id}`}>

                  <div className="relative group overflow-hidden bg-white rounded-lg shadow-lg hover:scale-105 ease-in duration-300">
                    {item.pin && (
                      <div className="absolute top-2 right-2 text-gray-600 bg-white p-1 rounded-full">
                        <FaThumbtack />
                      </div>
                    )}
                    <Image
                      className="w-full h-60 object-contain"
                      src={item?.thumbnail?.path}
                      alt={item?.title}
                      height={240}
                      width={320}
                    />
                    <div className="p-4">
                      <div className="flex flex-row justify-between">
                        <h1 className="text-2xl font-semibold mt-4">{item.title}</h1>
                        <div className="text-lg text-[white] bg-green-600 ml-4">
                          {formatCategories(item?.category)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        {item?.author?.firstName} -{" "}
                        {formatDate({ createdon: item?.createdOn })}
                      </div>
                      <p className="text-sm mt-2 line-clamp-3">{item?.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-[25%]">
          <FeaturedPosts />
          <LatestPosts />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
