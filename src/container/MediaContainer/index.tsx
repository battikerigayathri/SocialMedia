// "use client";
// import { serverFetch } from "@/action";
// import { useLazyQuery } from "@/hook";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { Gallery } from "react-grid-gallery";
// import { FiEdit } from "react-icons/fi";
// import { BeatLoader } from "react-spinners";
// import New from "./new";
// import toast, { Toaster } from "react-hot-toast";
// import ConfirmationModal from "@/components/modal/DeleteModal";
// import Breadcrumbs from "@/components/BreadCrumbs";
// import EditModal from "@/components/modal/EditModel";
// // import EditConfirmationModal from "@/components/modal/EditModel";
// const MediaContainer = () => {
//   const router = useRouter();
//   const [getAllMedia, { data, error, loading }] = useLazyQuery(serverFetch);
//   const [DeleteAsset, deleteResp] = useLazyQuery(serverFetch);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
//   const [photos, setPhotos] = useState([]);
//   const [addButtonLoading, setAddButtonLoading] = useState(false);
//   useEffect(() => {
//     getAllMedia(
//       `
//         query ListAssets($limit: Int!, $where: whereAssetInput,$sort: sortAssetInput) {
//             listAssets(limit: $limit, where: $where,sort: $sort) {
//               docs {
//                 id
//                 name
//                 type
//                 path
//                 altText
//                 description
//                 createdOn
//                 updatedOn
//               }
//             }
//           }`,
//       {
//         limit: 500,
//         where: {
//           mediaType: "MEDIA",
//         },
//         sort: {
//           createdOn: "desc",
//         },
//       },
//       {
//         cache: "no-store",
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (data) {
//     }
//   }, [data, error, loading]);

//   const handleDeleteAsset = (id: string) => {
//     setSelectedAssetId(id);
//     setIsModalOpen(true);
//   };

//   const confirmDelete = () => {
//     if (selectedAssetId) {
//       DeleteAsset(
//         `
//                 mutation DeleteAsset($deleteAssetId: ID!) {
//                     deleteAsset(id: $deleteAssetId)
//                 }`,
//         {
//           deleteAssetId: selectedAssetId,
//         },
//         {
//           cache: "no-store",
//         }
//       );
//       setIsModalOpen(false);
//     }
//   };


//   const handleEditClick = (id: string) => {
//     setSelectedAssetId(id);
//     setIsEditModalOpen(true);
//   };

//   const confirmEdit = () => {
//     setIsEditModalOpen(false);
//     if (selectedAssetId) {
//       router.push(`/admin/dashboard/media/view/${selectedAssetId}?edit=true`);
//     }
//   };

//   const cancelDelete = () => {
//     setIsModalOpen(false);
//   };
//   useEffect(() => {
//     if (deleteResp.data) {
//       toast.success("Deleted Successfully."), window.location.reload();
//     } else if (deleteResp.error) {
//       toast.error(deleteResp.error?.message);
//     }
//   }, [deleteResp.data, deleteResp.error, deleteResp.loading]);

//   const breadcrumbItems = [
//     { label: "Home", href: "/" },
//     { label: "Dashboard", href: "/admin/dashboard" },
//     { label: "Media", href: "/admin/dashboard/media" },
//   ]

//   const handleAddClick = () => {
//     setAddButtonLoading(true); // Set loading state to true
//     router.push("/admin/dashboard/media/add-image");
//   };

//   function cancelEdit(): void {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <div className="flex flex-col w-[calc(100vw-260px)] mt-16">
//       <Breadcrumbs items={breadcrumbItems}/>
//       <div className="flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center">
//         <h4 className="text-center font-bold text-[20px]">Media</h4>
//         {/* <button
//           className="bg-blue-950 text-white px-4 py-2 rounded-md"
//           onClick={() => router.push("/admin/dashboard/media/add-image")}
//         >
//           Add
//         </button> */}

//         <button
//           className="bg-blue-950 text-white px-4 py-2 rounded-md flex items-center justify-center"
//           onClick={handleAddClick}
//           disabled={addButtonLoading} // Disable button during loading
//         >
//           {addButtonLoading ? (
//             <BeatLoader color="white" size={10} /> // Show loader inside button
//           ) : (
//             "Add"
//           )}
//         </button>
//       </div>
//       {loading ? (
//         <div className="flex justify-center items-center h-[calc(100vh-190px)]">
//           <BeatLoader color="gray" size={20} />
//         </div>
//       ) : (
//         <div className="max-h-[calc(100vh-185px)] overflow-y-auto">
//           <div className="flex flex-row flex-wrap gap-2">
//             {data?.listAssets?.docs.map((item: any) => {
//               return (
//                 <New
//                   imageurl={item.path}
//                   id={item.id}
//                   onclick={() => handleDeleteAsset(item.id)}
//                   onEditClick={() => handleEditClick(item.id)}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       )}
//       <Toaster />
//       <EditModal
//         isOpen={isEditModalOpen}
//         onConfirm={confirmEdit}
//         onCancel={cancelEdit}
//         onClose={cancelEdit}
//       />
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onConfirm={confirmDelete}
//         onCancel={cancelDelete}
//         onClose={cancelDelete}
//       />
//     </div>
//   );
// };

// export default MediaContainer;



"use client";
import { serverFetch } from "@/action";
import { useLazyQuery } from "@/hook";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import New from "./new";
import toast, { Toaster } from "react-hot-toast";
import ConfirmationModal from "@/components/modal/DeleteModal";
import Breadcrumbs from "@/components/BreadCrumbs";
import EditModal from "@/components/modal/EditModel";
// import EditConfirmationModal from "@/components/modal/EditModal"; // Import your edit modal

const MediaContainer = () => {
  const router = useRouter();
  const [getAllMedia, { data, error, loading }] = useLazyQuery(serverFetch);
  const [DeleteAsset, deleteResp] = useLazyQuery(serverFetch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [photos, setPhotos] = useState([]);
  const [addButtonLoading, setAddButtonLoading] = useState(false);

  useEffect(() => {
    getAllMedia(
      `
        query ListAssets($limit: Int!, $where: whereAssetInput,$sort: sortAssetInput) {
            listAssets(limit: $limit, where: $where,sort: $sort) {
              docs {
                id
                name
                type
                path
                altText
                description
                createdOn
                updatedOn
              }
            }
          }`,
      {
        limit: 500,
        where: {
          mediaType: "MEDIA",
        },
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
    if (data) {
      setPhotos(data.listAssets.docs);
    }
  }, [data, error, loading]);

  const handleDeleteAsset = (id: string) => {
    setSelectedAssetId(id);
    setIsModalOpen(true);
  };

  // const handleEditClick = (id: string) => {
  //   setSelectedAssetId(id);
  //   setIsEditModalOpen(true);
  //   console.log("edit modal",id)
  // };

  const confirmDelete = () => {
    if (selectedAssetId) {
      DeleteAsset(
        `
                mutation DeleteAsset($deleteAssetId: ID!) {
                    deleteAsset(id: $deleteAssetId)
                }`,
        {
          deleteAssetId: selectedAssetId,
        },
        {
          cache: "no-store",
        }
      );
      setIsModalOpen(false);
    }
  };

  // const confirmEdit = () => {
  //   if (selectedAssetId) {
  //     setIsEditModalOpen(false);
  //     router.push(`/admin/dashboard/media/view/${id}?edit=false`);
  //     // {`/admin/dashboard/media/view/${id}?edit=false`}
  //   }
  // };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  // const cancelEdit = () => {
  //   setIsEditModalOpen(false);
  // };

  useEffect(() => {
    if (deleteResp.data) {
      toast.success("Deleted Successfully.");
      window.location.reload();
    } else if (deleteResp.error) {
      toast.error(deleteResp.error?.message);
    }
  }, [deleteResp.data, deleteResp.error, deleteResp.loading]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Media", href: "/admin/dashboard/media" },
  ];

  const handleAddClick = () => {
    setAddButtonLoading(true);
    router.push("/admin/dashboard/media/add-image");
  };

  return (
    <div className="flex flex-col w-[calc(100vw-260px)] mt-16 ">
      <Breadcrumbs  items={breadcrumbItems} />
      <div className="pt-5">

      <div className="flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center">
        <h4 className="text-center font-bold text-[20px]">Media</h4>
        <button
          className="bg-blue-950 text-white px-4 py-2 rounded-md flex items-center justify-center"
          onClick={handleAddClick}
          disabled={addButtonLoading}
        >
          {addButtonLoading ? (
            <BeatLoader color="white" size={10} />
          ) : (
            "Add"
          )}
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-190px)]">
          <BeatLoader color="gray" size={20} />
        </div>
      ) : (
        <div className="max-h-[calc(100vh-185px)] overflow-y-auto">
          <div className="flex flex-row flex-wrap gap-2">
            {photos.map((item: any) => {
              return (
                <New
                  key={item.id}
                  imageurl={item.path}
                  id={item.id}
                  onclick={() => handleDeleteAsset(item.id)}
                  />
                  // onEditclick={() => handleEditClick(item.id)}
              );
            })}
          </div>
        </div>
      )}
      <Toaster />
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        onClose={cancelDelete}
      />
      {/* <EditModal
        isOpen={isEditModalOpen}
        onConfirm={confirmEdit}
        onCancel={cancelEdit}
        onClose={cancelEdit}
      /> */}
      </div>
    </div>
  );
};

export default MediaContainer;
