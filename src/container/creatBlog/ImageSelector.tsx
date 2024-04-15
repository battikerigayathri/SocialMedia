import { serverFetch } from "@/action";
import { useLazyQuery } from "@/hook";
import React, { useEffect, useState } from "react";
import { Gallery, Image } from "react-grid-gallery";
import { BeatLoader } from "react-spinners";

const ImageSelector = ({
  setSelectedAssetId,
  setOpenSelect,
  selectedAssetId,
}: {
  setSelectedAssetId: Function;
  setOpenSelect: Function;
  selectedAssetId: string;
}) => {
  const [images, setImages] = useState<Image[]>([]);
  const [getAssets, { data, loading, error }] = useLazyQuery(serverFetch);
  const [formattedImages, setFormattedImages] = useState<Image[]>([]);

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
      let formImages = data?.listAssets?.docs?.map((img: any) => {
        return {
          key: img.id,
          src: img?.path,
          isSelected: false,
          alt: img?.altText,
        };
      });

      setFormattedImages(formImages);
      setImages(formImages);
    }
  }, [data, loading, error]);

  const handleSelect = (index: number) => {
    const nextImages = formattedImages.map((image, i) =>
      i === index ? { ...image, isSelected: !image.isSelected } : image
    );
    setSelectedAssetId(formattedImages[index].key);
    setImages(nextImages);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-700 opacity-50"></div>
      <div className="bg-white rounded-lg p-8 w-[80%] max-h-[80%] overflow-hidden relative">
        <button
          onClick={() => setOpenSelect(false)}
          className="absolute top-0 right-0 m-4 px-2 py-1 text-gray-700 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none"
        >
          Close
        </button>
        <div className="overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-[calc(100vh-190px)]">
              <BeatLoader color="gray" size={20} />
            </div>
          ) : (
            <Gallery images={images} onSelect={handleSelect} />
          )}
        </div>
      </div>
    </div>
  );
};
export default ImageSelector;
