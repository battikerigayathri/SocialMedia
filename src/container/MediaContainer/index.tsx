"use client";
import { serverFetch } from '@/action';
import { useLazyQuery } from '@/hook';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Gallery } from 'react-grid-gallery';
import { FiEdit } from 'react-icons/fi';
import { BeatLoader } from 'react-spinners';
const MediaContainer = () => {
    const router = useRouter();
    const [getAllMedia, { data, error, loading }] = useLazyQuery(serverFetch);
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        getAllMedia(`
        query ListAssets($limit: Int!, $where: whereAssetInput) {
            listAssets(limit: $limit, where: $where) {
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
                "limit": 500,
                "where": {
                    "mediaType": "MEDIA"
                }
            },
            {
                cache: "no-store"
            }
        )
    }, [])

    useEffect(() => {
        if (data) {

            setPhotos(data?.listAssets?.docs?.map((asset: any) => {
                return {
                    src: asset.path,
                    alt: asset.altText,
                    id: asset.id,
                    customOverlay: (
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-80 bg-gray-900">
                            <FiEdit className='text-white text-2xl' />
                        </div>
                    ),
                }
            })
            )
        }
    }, [data, error, loading]);
    return (
        <div className='flex flex-col w-[calc(100vw-260px)] ' >
            <div className='flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center'>
                <h4 className='text-center font-bold text-[20px]'>Media</h4>
                <button className='bg-blue-950 text-white px-4 py-2 rounded-md' onClick={() => router.push("/media/add-image")}>Add</button>
            </div>
            {loading ?
                <div className='flex justify-center items-center h-[calc(100vh-190px)]'>
                    <BeatLoader color="gray" size={20} />
                </div> :
                <div className="max-h-[calc(100vh-185px)] overflow-y-auto">

                    <Gallery images={photos} enableImageSelection={false} onClick={(_, image: any) => {

                        router.push(`/media/view/${image?.id}?edit=false`)
                    }} />
                </div>
            }
        </div>
    )
}

export default MediaContainer