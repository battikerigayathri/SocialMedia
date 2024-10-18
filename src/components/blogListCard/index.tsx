// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useEffect } from "react";
// import { FiEdit } from "react-icons/fi";
// import { RiTimer2Line } from "react-icons/ri";
// import { MdOutlineDeleteOutline } from "react-icons/md";

// import toast, { Toaster } from "react-hot-toast";
// import { useLazyQuery } from "@/hook";
// import { serverFetch } from "@/action";

// const BlogListCard = ({
//   imgSrc,
//   heading,
//   description,
//   Categories,
//   created,
//   id,
//   content,
//   slug,
// }: {
//   imgSrc: string | undefined;
//   heading: string | undefined;
//   description: string | undefined;
//   Categories: string | undefined;
//   created: string;
//   id: string | undefined;
//   content?: string | undefined;
//   slug: string | undefined;
// }) => {
//   const [deleteBlog, { data, loading, error }] = useLazyQuery(serverFetch);

//   const router = useRouter();

//   const handleBlogDelete = () => {
//     const confirm = window.confirm("are sure to delete.");
//     if (confirm == true) {
//       toast.success("Deleted Successfully.");
//       deleteBlog(
//         `mutation DeleteBlog($deleteBlogId: ID!) {
//       deleteBlog(id: $deleteBlogId)
//     }`,
//         {
//           deleteBlogId: id,
//         }
//       );
//     }
//   };

//   useEffect(() => {
//     if (data) {
//       // toast.success("Blog Deleted")

//       window.location.reload();
//     }
//     if (error) {
//       // toast.error(error?.message)
//     }
//   }, [data, loading, error]);
//   return (
//     <div className="relative group hover:scale-105 ease-in duration-300">
//       <div className="mx-auto h-[480px] w-80 bg-white shadow-md border border-gray-200 rounded-lg mb-5">
//         <div className="">
//           <div className="relative ">
//             <Link href={`/${slug}`} className="">
//               <img
//                 className="rounded-t-lg w-80 h-60 object-cover"
//                 src={
//                   imgSrc
//                     ? imgSrc
//                     : "https://assets-global.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
//                 }
//                 alt="image"
//                 height={1000}
//                 width={1000}
//               />
//             </Link>
//             <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//               <button
//                 className="px-2 py-1 bg-blue-400 hover:bg-blue-900 rounded hover:text-white text-[10px]"
//                 onClick={() => {
//                   router.push(`/admin/dashboard/blog/edit?id=${id}`);
//                 }}
//               >
//                 <span>
//                   {" "}
//                   <FiEdit className="w-4 h-4" />
//                 </span>
//               </button>
//               <button
//                 className="px-2 py-1 bg-red-500 hover:bg-red-900 rounded hover:text-white text-[10px]"
//                 onClick={handleBlogDelete}
//               >
//                 <span>
//                   {" "}
//                   <MdOutlineDeleteOutline className="w-4 h-4" />
//                 </span>
//               </button>
//             </div>
//           </div>

//           <div className="p-5 pb-2 flex justify-start items-start flex-col">
//             <div className="flex justify-between text-[12px] mb-2 w-full">
//               <h6 className="flex justify-center items-center gap-1">
//                 <RiTimer2Line />
//                 {new Date(created).toDateString().split(" ").slice(1).join(" ")}
//               </h6>
//               <p className="font-normal text-gray-700 mb-3 overflow-hidden line-clamp-3">
//                 {Categories}
//               </p>
//               <p className="flex justify-center items-center gap-1">
//                 {/* <LiaReadme className="w-5 h-5" /> */}
//                 {/* {getBlogReadTime(content ? content : "Hello ** world **")} */}
//               </p>
//             </div>
//             <div className="overflow-hidden w-full h-full">
//               {/* <Link
//                 href={`blog/${id}`}> */}
//               <h5 className="text-gray-900 font-bold text-xl tracking-tight mb-2   overflow-hidden line-clamp-2">
//                 {heading}
//               </h5>
//               {/* </Link> */}
//               <p className="font-normal text-gray-700 mb-3 overflow-hidden line-clamp-3">
//                 {description}
//               </p>
             
//             </div>
//             <div className=" absolute bottom-8 left-5">
//               <p>Author: Admin</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default BlogListCard;


import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect , useState} from "react";
import { FiEdit } from "react-icons/fi";
import { RiTimer2Line } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import ConfirmationModal from "../modal/DeleteModal";
import EditConfirmationModal from "../modal/EditModel";

const BlogListCard = ({
  imgSrc,
  heading,
  categories,
  description,
  Categories,
  created,
  id,
  content,
  slug,
}: {
  imgSrc: string | undefined;
  heading: string | undefined;
  description: string | undefined;
  Categories: string | undefined;
  created: string;
  id: string | undefined;
  content?: string | undefined; 
  slug: string | undefined;
}) => {
  const [deleteBlog, { data, loading, error }] = useLazyQuery(serverFetch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditConfirmModalOpen, setIsEditConfirmModalOpen] = useState(false);
  const [isUpdateConfirmModalOpen, setIsUpdateConfirmModalOpen] = useState(false);
  const router = useRouter();

  const handleBlogDelete = () => {
    setIsModalOpen(true);
  };

  const handleEditConfirm = () => {
    setIsEditConfirmModalOpen(false);
    router.push(`/admin/dashboard/blog/edit?id=${id}`);
  };
  

  const confirmDelete = async () => {
    setIsModalOpen(false);
    try {
      await deleteBlog(
        `mutation DeleteBlog($deleteBlogId: ID!) {
          deleteBlog(id: $deleteBlogId)
        }`,
        {
          deleteBlogId: id,
        }
      );
      toast.success("Deleted Successfully.");
    } catch (error) {
      toast.error('Deletion failed: ' + (error as Error).message);
    }
  };
  const handleEdit = () => {
    setIsEditConfirmModalOpen(true); // Open the edit confirmation modal
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (data) {
      window.location.reload();
    }
    if (error) {
      toast.error(error.message);
    }
  }, [data, loading, error]);

  return (
    <div className="relative group hover:scale-105 ease-in duration-300">
      
      <div className="mx-auto h-[480px] w-80 bg-white shadow-md border border-gray-200 rounded-lg mb-5">
        <div>
          <div className="relative">
            <Link href={`/${slug}`}>
              <img
                className="rounded-t-lg w-80 h-60 object-contain"
                src={
                  imgSrc
                    ? imgSrc
                    : "https://assets-global.website-files.com/6324331488eeaaad6ed0be97/63620f99776dc1648a7a5d0a_image-preview.png"
                }
                alt="image"
                height={1000}
                width={1000}
              />
            </Link>
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                className="px-2 py-1 bg-blue-400 hover:bg-blue-900 rounded hover:text-white text-[10px]"
                onClick={handleEdit}
              >
                <FiEdit className="w-4 h-4" />
              </button>
              <button
                className="px-2 py-1 bg-red-500 hover:bg-red-900 rounded hover:text-white text-[10px]"
                onClick={handleBlogDelete}
              >
                <MdOutlineDeleteOutline className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-5 pb-2 flex flex-col">
            <div className="flex justify-between items-center text-[12px] mb-2 w-full">
              <h6 className="flex items-center gap-1">
                <RiTimer2Line />
                {new Date(created).toDateString().split(" ").slice(1).join(" ")}
              </h6>
              <div className="flex flex-wrap gap-1 ">
                {categories?.split(',').map((category, index) => (
                  <span key={index} className="text-[green] rounded px-2 py-1 text-xl font-bold">
                    {category.trim()}
                  </span>
                ))}
              </div>
              
            </div>
            <div className="overflow-hidden w-full">
              <h5 className="text-gray-900 font-bold text-xl tracking-tight mb-2 overflow-hidden line-clamp-2">
                {heading}
              </h5>
              <p className="font-normal text-gray-700 mb-3 overflow-hidden line-clamp-3">
                {description}
              </p>
            </div>
            <div className="absolute bottom-8 left-5">
              <p>Author: Admin</p>
            </div>
          </div>
        </div>
      </div>
      <EditConfirmationModal
      isOpen={isEditConfirmModalOpen}
      onConfirm={handleEditConfirm}
      onCancel={() => setIsEditConfirmModalOpen(false)}
    />
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        onClose={cancelDelete}
      />
      <Toaster />
    </div>
  );
};

export default BlogListCard;
