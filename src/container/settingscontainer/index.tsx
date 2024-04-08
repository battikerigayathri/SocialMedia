"use client"
import React, { useEffect, useState } from 'react'

function SettingsContainer() {
    const [title,setTitle]=useState("")
    const [logo,setLogo]=useState<any>()
    console.log(title,"title")
    console.log(logo,"logo")
    if (logo && logo?.name) {
        const extension = logo.name.split('.').pop();
        if (extension !== 'png') {
          alert('Only PNG files are allowed.');
          
        }
        else{
            const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        console.log(width,height,"asdfghhg")
        if (width > 300 || height > 80) {
          alert('Image dimensions should be less than 300x80.');
        }
      };
      //@ts-ignore
      img.src = e.target.result;
    };
    reader.readAsDataURL(logo);
        }
      }

  return (
    <div className='flex flex-col w-[calc(100vw-260px)] gap-5'>
    <div className='flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center'>
        <h4 className='text-center font-bold text-[20px]'>Settings</h4>
    </div>
    <form className="mt-8 space-y-3" action="#" method="POST">
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Title</label>
                            <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="" placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
                    </div>
                    <button type="submit" className=" bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10  text-center">
                        Update
                    </button>
                    </form>
                    <form className="mt-8 space-y-3" action="#" method="POST">

                    <div className="grid grid-cols-1 space-y-2">
                                    <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                        <div className="flex items-center justify-center w-full" >
                            <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div className="h-full w-full text-center flex flex-col items-center justify-center   ">
                                    {/* <!---<svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>--> */}
                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image"/>
                                    </div>
                                    <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> </p>
                                </div>
                                <input type="file" className="hidden" onChange={(e)=>setLogo(e.target.files[0])}/>
                            </label>
                        </div>
                    </div>
                            <p className="text-sm text-gray-300">
                                <span>File type: doc,pdf,types of images</span>
                            </p>
                    <div>
                        <button type="submit" className=" bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10  text-center">
                        Upload
                    </button>
                    </div>
        </form>
    </div>
  )
}

export default SettingsContainer
