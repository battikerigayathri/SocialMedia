"use client"
import { serverFetch, uploadFile } from '@/action'
import { useLazyQuery } from '@/hook'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
function SettingsContainer() {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [logo, setLogo] = useState<any>()
    const [settingsfun, settingsResponse] = useLazyQuery(serverFetch)
    const [updateSettingsfun, updateSettingsResponse] = useLazyQuery(serverFetch)
    const [updateSettings, setUpdateSettings] = useState(false)
    const [imgsrc,setimgsrc]=useState('')

    useEffect(() => {
        settingsfun(`
    query GetSetting($where: whereSettingInput!) {
        getSetting(where: $where) {
          logo {
            id
            name
            mediaType
            type
            path
            altText
            description
            createdOn
            updatedOn
          }
          title
        }
      }
    `,{
            "where": {
                "id": {
                    "is": "66139fe4c1d3ab09f12ee576"
                }
            }
        },{
            cache: 'no-store',
        })
    }, [])
    useEffect(() => {
        if (settingsResponse?.data) {
            console.log(settingsResponse?.data,"data")
            setimgsrc(settingsResponse?.data?.getSetting?.logo?.path)
        }
    }, [settingsResponse])

    console.log(title, "title")
    console.log(logo, "logo")

    const updateSetttingsFun = () => {
        updateSettingsfun(`
        mutation UpdateSetting($input: updateSettingInput!) {
            updateSetting(input: $input) {
              title
            }
          }`, {
            "input": {
                "id": "66139fe4c1d3ab09f12ee576",
                "title": title
            }
        }, {
            cache: 'no-store',
        })
    }
    useEffect(() => {
        if (updateSettingsResponse?.data) {
            router.refresh()
        }

    }, [updateSettingsResponse])
    const updateFile = async () => {
        //         if (logo && logo?.name) {
        //     const extension = logo.name.split('.').pop();
        //     if (extension !== 'png') {
        //         alert('Only PNG files are allowed.');
        //         return
        //     }
        //     else {
        //         const reader = new FileReader();
        //         reader.onload = (e) => {
        //             const img = new Image();
        //             img.onload = () => {
        //                 const width = img.width;
        //                 const height = img.height;
        //                 console.log(width, height, "asdfghhg")
        //                 if (width > 300 || height > 80) {
        //                     alert('Image dimensions should be less than 300x80.');
        //                     return
        //                 }
        //             };
        //             //@ts-ignore
        //             img.src = e.target.result;
        //         };
        //         reader.readAsDataURL(logo);
        //     }
        // }
        try {
            const formData = new FormData();
            formData.append('file', logo);
            console.log(formData, "sdcfvgbhjn")

            // const response = await axios.post("api/logo-upload",formData,{
            //     headers: { "Content-Type": "multipart/form-data" },
            // })
            const response = await fetch('/api/logo-upload', {
                method: 'POST',
                body: formData
            });

            console.log(response);
            console.log(response.statusText)
            if(response.statusText==="OK") {
            toast.success("Logo updated")

             router.refresh()

            }
            if(response.status === 400) {
                throw new Error(response.statusText);
            }
            const responseData = await response.json();
            console.log(responseData)
            console.log(response,"resp")
                   } catch (e:any) {
            console.log(e?.message)
            toast.error(e?.message)
        }
    }


    return (
        <div className='flex flex-col w-[calc(100vw-260px)] gap-5'>
            <div className='flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center'>
                <h4 className='text-center font-bold text-[20px]'>Settings</h4>
            </div>

            <div className="shadow-md rounded-b-lg ">
                <div className='bg-blue-950 h-10 rounded-t-lg flex flex-col justify-center font-medium p-2 text-white'>
                    {updateSettings?"Change your settings here":"Your settings"}
                </div>
                {updateSettings?<div> <div className='flex flex-row justify-around items-center p-3'>  
                 <form className="mt-8 space-y-3" >
                <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide ">Title</label>
                    <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 w-[250px]" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <button type="submit" className=" bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10  text-center" onClick={updateSetttingsFun}>
                    Update
                </button>
            </form>
            <div className="mt-8 space-y-3" >

                <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 ">Attach Document</label>
                    <div className="flex items-center " >
                        <label className="flex flex-col rounded-lg border-4 border-dashed h-60 p-10 group text-center">
                            <div className="h-full  text-center flex flex-col items-center justify-center   ">
                                {/* <!---<svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>--> */}
                                <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />
                                </div>
                                <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> </p>
                            </div>
                            <input type="file" className="hidden" onChange={(e) => setLogo(e.target.files[0])} />
                        </label>
                    </div>
                </div>
                <p className="text-sm text-gray-300">
                    <span>File type: png</span>
                </p>
                <div>
                    <button className=" bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10  text-center" onClick={() => updateFile()}>
                        Upload
                    </button>
                </div>
                
            </div></div> <div className='flex flex-row justify-end p-5'>
                <button className=" bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10 w-36  text-center" onClick={() => setUpdateSettings(false)}>
                        Close
                    </button>
                    </div></div>:<>
                <div className='flex flex-row justify-around items-center p-5 rounded-b-lg'>
                    <h1 className=' font-bold'>Title: {settingsResponse?.data?.
                        getSetting
                        ?.title}</h1>
                    <div className='flex flex-row justify-around items-center' >
                        <h1 className=' font-bold'>Logo: </h1>
                        <img src={`${imgsrc}?id=${uuidv4()}`}  alt='' width={300} height={100}/>
                    </div>
                </div>
                <div className='flex flex-row justify-end p-5'>
                <button className=" bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10 w-36  text-center" onClick={() => setUpdateSettings(true)}>
                        Update Settings
                    </button>
                    </div>
                </>}
            </div>
            <Toaster />
        </div>
    )
}

export default SettingsContainer
