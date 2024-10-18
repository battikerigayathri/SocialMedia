// import { serverFetch } from "@/action";
// import { useLazyQuery } from "@/hook";
// import React, { useEffect, useState } from "react";
// import { Gallery, Image } from "react-grid-gallery";
// import { BeatLoader } from "react-spinners";

// const ImageSelector = ({
//   setSelectedAssetId,
//   setOpenSelect,
//   selectedAssetId,
// }: {
//   setSelectedAssetId: Function;
//   setOpenSelect: Function;
//   selectedAssetId: string;
// }) => {
//   const [images, setImages] = useState<Image[]>([]);
//   const [getAssets, { data, loading, error }] = useLazyQuery(serverFetch);
//   const [formattedImages, setFormattedImages] = useState<Image[]>([]);

//   useEffect(() => {
//     getAssets(
//       `query ListAssets($limit: Int!, $where: whereAssetInput) {
//                 listAssets(limit: $limit, where: $where) {
//                     docs {
//                     id
//                     name
//                     type
//                     path
//                     altText
//                     }
//                     limit
//                 }
//             }`,
//       {
//         limit: 100,
//         where: {
//           mediaType: "MEDIA",
//         },
//       },
//       {
//         cache: "no-store",
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (data) {
//       const formImages = data?.listAssets?.docs?.map((img: any) => {
//           return {
//             key: img.id,
//             src: img?.path,
//             isSelected: false,
//             alt: img?.altText,
//           };
//       });

//       setFormattedImages(formImages);
//       const images = data?.listAssets?.docs?.map((img: any) => {
//         return {
//           key: img.id,
//           src: img?.path,
//           isSelected: img.id === selectedAssetId,
//           alt: img?.altText,
//         };
//     });
//       setImages(images);
//     }
//   }, [data, loading, error]);

//   const handleSelect = (index: number) => {
//     setSelectedAssetId(formattedImages[index].key);
//     const nextImages = formattedImages.map((image, i) => {
//       return i === index ? { ...image, isSelected: !image.isSelected } : image;
//     });
//     setImages(nextImages);
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
//       <div className="absolute top-0 left-0 w-full h-full bg-gray-700 opacity-50"></div>
//       <div className="bg-white rounded-lg p-8 w-[80%] max-h-[80%] overflow-hidden relative">
//         <button
//           onClick={() => setOpenSelect(false)}
//           className="absolute top-0 right-0 m-4 px-2 py-1 text-gray-700 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none"
//         >
//           Close
//         </button>
//         <div className="overflow-y-auto">
//           {loading ? (
//             <div className="flex justify-center items-center h-[calc(100vh-190px)]">
//               <BeatLoader color="gray" size={20} />
//             </div>
//           ) : (
//             <Gallery images={images} onSelect={handleSelect} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ImageSelector;


// import { serverFetch } from "@/action";
// import { useLazyQuery } from "@/hook";
// import React, { useEffect, useState } from "react";
// import { Gallery, Image } from "react-grid-gallery";
// import { BeatLoader } from "react-spinners";
// import classNames from "classnames";

// const ImageSelector = ({
//   setSelectedAssetId,
//   setOpenSelect,
//   selectedAssetId,
//   onImageSelect
// }: {
//   setSelectedAssetId: Function;
//   setOpenSelect: Function;
//   selectedAssetId: string;
//   onImageSelect: (assetId: string) => void;
// }) => {
//   const [images, setImages] = useState<Image[]>([]);
//   const [getAssets, { data, loading, error }] = useLazyQuery(serverFetch);
//   const [formattedImages, setFormattedImages] = useState<Image[]>([]);
//   const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

//   useEffect(() => {
//     getAssets(
//       `query ListAssets($limit: Int!, $where: whereAssetInput) {
//                 listAssets(limit: $limit, where: $where) {
//                     docs {
//                     id
//                     name
//                     type
//                     path
//                     altText
//                     }
//                     limit
//                 }
//             }`,
//       {
//         limit: 100,
//         where: {
//           mediaType: "MEDIA",
//         },
//       },
//       {
//         cache: "no-store",
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (data) {
//       const formImages = data?.listAssets?.docs?.map((img: any) => {
//         return {
//           key: img.id,
//           src: img?.path,
//           isSelected: false,
//           alt: img?.altText,
//         };
//       });

//       setFormattedImages(formImages);
//       const images = data?.listAssets?.docs?.map((img: any) => {
//         return {
//           key: img.id,
//           src: img?.path,
//           isSelected: false,
//           alt: img?.altText,
//         };
//       });
//       setImages(images);
//     }
//   }, [data, loading, error]);

//   const handleSelect = (index: number) => {
//     setSelectedImageIndex(index);
//   };

//   const handleFinalSelect = () => {
//     if (selectedImageIndex !== null) {
//       setSelectedAssetId(formattedImages[selectedImageIndex].key);
//       setSelectedAssetId(selectedAssetId);
//       onImageSelect(selectedAssetId);
//       setOpenSelect(false);
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
//       <div className="absolute top-0 left-0 w-full h-full bg-gray-700 opacity-50"></div>
//       <div className="bg-white rounded-lg p-8 w-[80%] max-h-[80%] overflow-hidden relative">
//         <div className="absolute top-0 right-0 m-4 flex space-x-2">
//           <button
//             onClick={() => setOpenSelect(false)}
//             className="px-2 py-1 text-gray-700 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none"
//           >
//             Close
//           </button>
//           <button
//             onClick={handleFinalSelect}
//             className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
//           >
//             Select
//           </button>
//         </div>
//         <div className="overflow-y-auto mt-12 max-h-[calc(100vh-200px)]">
//           {loading ? (
//             <div className="flex justify-center items-center h-[calc(100vh-190px)]">
//               <BeatLoader color="gray" size={20} />
//             </div>
//           ) : (
//             <div className="grid grid-cols-4 gap-4">
//               {images.map((image, index) => (
//                 <div
//                   key={image.key}
//                   onClick={() => handleSelect(index)}
//                   className="relative cursor-pointer"
//                 >
//                   <img
//                     src={image.src}
//                     alt={image.alt}
//                     className={classNames("transition-transform transform", {
//                       "scale-110": index === selectedImageIndex,
//                     })}
//                   />
//                   {index === selectedImageIndex && (
//                     <div className="absolute top-1 left-1 w-5 h-5 flex items-center justify-center bg-blue-500 rounded-lg">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 text-white"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageSelector;



import { serverFetch } from "@/action";
import { useLazyQuery } from "@/hook";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import classNames from "classnames";

const ImageSelector = ({
  setSelectedAssetId,
  setOpenSelect,
  selectedAssetId,
  onImageSelect, // Callback to pass selected image
}: {
  setSelectedAssetId: Function;
  setOpenSelect: Function;
  selectedAssetId: string;
  onImageSelect: (imageUrl: string) => void; // Adjust to pass URL
}) => {
  const [images, setImages] = useState<any[]>([]);
  const [getAssets, { data, loading, error }] = useLazyQuery(serverFetch);
  const [formattedImages, setFormattedImages] = useState<any[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    getAssets(
      `query ListAssets($limit: Int!, $where: whereAssetInput) {
                listAssets(limit: $limit, where: $where) {
                    docs {
                    id
                    name
                    type
                    path
                    altText
                    }
                    limit
                }
            }`,
      {
        limit: 100,
        where: {
          mediaType: "MEDIA",
        },
      },
      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    if (data) {
      const formImages = data?.listAssets?.docs?.map((img: any) => ({
        key: img.id,
        src: img?.path,
        isSelected: false,
        alt: img?.altText,
      }));

      setFormattedImages(formImages);
      setImages(formImages);
    }
  }, [data, loading, error]);

  const handleSelect = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleFinalSelect = () => {
    if (selectedImageIndex !== null) {
      const selectedImage = formattedImages[selectedImageIndex];
      setSelectedAssetId(selectedImage.key);
      onImageSelect(selectedImage.src); // Pass the image URL
      setOpenSelect(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-700 opacity-50"></div>
      <div className="bg-white rounded-lg p-8 w-[80%] max-h-[80%] overflow-hidden relative">
        <div className="absolute top-0 right-0 m-4 flex space-x-2">
          <button
            onClick={() => setOpenSelect(false)}
            className="px-2 py-1 text-gray-700 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none"
          >
            Close
          </button>
          <button
            onClick={handleFinalSelect}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
          >
            Select
          </button>
        </div>
        <div className="overflow-y-auto mt-12 max-h-[calc(100vh-200px)]">
          {loading ? (
            <div className="flex justify-center items-center h-[calc(100vh-190px)]">
              <BeatLoader color="gray" size={20} />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={image.key}
                  onClick={() => handleSelect(index)}
                  className="relative cursor-pointer"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={classNames("transition-transform transform", {
                      "scale-110": index === selectedImageIndex,
                    })}
                  />
                  {index === selectedImageIndex && (
                    <div className="absolute top-1 left-1 w-5 h-5 flex items-center justify-center bg-blue-500 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;
