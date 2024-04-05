"use client";
import { serverFetch } from '@/action';
import { useLazyQuery } from '@/hook';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { FiEdit } from "react-icons/fi";


const MediaContainer = () => {
    const router = useRouter();
    const [getAllMedia, { data, error, loading }] = useLazyQuery(serverFetch);
    useEffect(() => {

    }, [])
    return (
        <div className='flex flex-col w-[calc(100vw-260px)] ' >
            <div className='flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center'>
                <h4 className='text-center font-bold text-[20px]'>Media</h4>
                <button className='bg-blue-950 text-white px-4 py-2 rounded-md' onClick={() => router.push("/media/add-image")}>Add</button>
            </div>
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:grap-8 md:gap-6 gap-4 mt-10 max-h-[calc(100vh-190px)] overflow-y-auto">
                <div className="relative group cursor-pointer" onClick={() => router.push("/media/view")}>
                    <img src="https://i.ibb.co/QHS8Ngp/pexels-alana-sousa-3294250-1.png" alt="A picture of a sitting dog" className="lg:block hidden w-full" />
                    <div className="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                        <FiEdit className='text-gray-200 text-2xl' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediaContainer