// "use client"
// import { useFormik } from 'formik'
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react'
// import { ClipLoader } from 'react-spinners';
// import * as Yup from 'yup';
// import toast, { Toaster } from 'react-hot-toast';
// const AddMediaContainer = () => {
//     const [loading,setLoading]=useState(false)
//     const router = useRouter();
//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             name: '',
//             altText: "",
//             description: "",
//             file: null
//         },
//         validationSchema: Yup.object().shape({
//             file: Yup.mixed().required('File is required')
//                 .test('fileFormat', 'Only png, jpg and jpeg files are allowed', value => {
//                     if (value) {
//                         const supportedFormats = ['png', 'jpg', 'jpeg'];
//                         //@ts-ignore
//                         return supportedFormats.includes(value?.name?.split('.').pop());
//                     }
//                     return true;
//                 }),
//             name: Yup.string().required('Name is required'),
//             description: Yup.string().required('Description is required'),
//             altText: Yup.string().required('Alternative text is required'),
//         }),
//         onSubmit: async (values: any) => {
//             try {
//                 setLoading(true)
//                 const formData = new FormData();
//                 Object.keys(values).forEach((key) => {
//                     formData.append(key, values[key]);
//                 });

//                 const response = await fetch('/api/image-upload', {
//                     method: 'POST',
//                     body: formData
//                 });

//                 console.log(response);
//                 if(response.status === 400) {
//                 setLoading(false)

//                     throw new Error(response.statusText);
//                 }
//                 const responseData = await response.json();
//                 if(response.status){
//                 setLoading(false)
//                 toast.success('Upload successful');
//                 setTimeout(() => {
//                     router.push('/admin/dashboard/media');
//                   }, 2000);
//                 }

//             } catch (error) {
//                 setLoading(false)
//                 // toast.error(error.message);
//                 console.error('Error:', error);
//             }
//         }
//     })


//     const handleFileChange = (e: any) => {
//         formik.setFieldValue('file', e.target.files[0]);
//     };
//     return (
//         <div className='flex justify-start flex-col gap-2 items-center rounded-lg w-full shadow-lg py-5 h-[calc(100vh-80px)] overflow-y-auto'>
//             <div className='w-full py-3 bg-black uppercase text-white px-8 rounded-t-lg text-base'>
//                 Add Media
//             </div>
//             <form onSubmit={formik.handleSubmit} className='mt-4 w-full flex justify-center items-center flex-col' encType="multipart/form-data">
//                 <div className="px-5  w-[100%]  justify-center grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
//                     <div className="">
//                         <label className="font-semibold text-sm text-gray-600  block">Image Name</label>
//                         <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" />

//                         {formik.touched.name && formik.errors.name ? (
//                             <div className="text-red-500 text-sm ">{formik.errors.name.toString()}</div>
//                         ) : null}
//                     </div>
//                     <div className="">
//                         <label className="font-semibold text-sm text-gray-600  block">Image Alternative Text</label>
//                         <input type="text" id="altText" name="altText" onChange={formik.handleChange} value={formik.values.altText} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" />

//                         {formik.touched.altText && formik.errors.altText ? (
//                             <div className="text-red-500 text-sm ">{formik.errors.altText.toString()}</div>
//                         ) : null}
//                     </div>
//                     <div className="">
//                         <label className="font-semibold text-sm text-gray-600  block">Select Image</label>
//                         <input type="file" id="file" accept='image/png, image/jpeg, image/jpg' name="file" onChange={handleFileChange} className="border rounded-lg px-3 py-1.5 mt-1 mb-[1px] text-sm w-full" />

//                         {formik.touched.file && formik.errors.file ? (
//                             <div className="text-red-500 text-sm ">{formik.errors.file.toString()}</div>
//                         ) : null}
//                     </div>
//                     <div className="col-span-2">
//                         <label className="font-semibold text-sm text-gray-600  block">Image Description</label>
//                         <textarea id="description" name="description" onChange={formik.handleChange} value={formik.values.description} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" rows={3} />

//                         {formik.touched.description && formik.errors.description ? (
//                             <div className="text-red-500 text-sm ">{formik.errors.description.toString()}</div>
//                         ) : null}
//                     </div>
//                 </div>
//                 <div className="mt-5 pl-5 pr-5 flex flex-row gap-5">
//                     <button type="submit" className="transition duration-500 w-[200px] bg-blue-950 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white py-2.5 px-8 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
//                     {loading ? (    <div
//                                                     style={{
//                                                         display: "flex",
//                                                         justifyContent: "center",
//                                                         alignItems: "center",
//                                                     }}
//                                                 >
//                                                     <ClipLoader size={20} color="#000" />
//                                                 </div>
//                                             ) : (
//                                                 "Upload"
//                                             )}
//                         {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                         </svg> */}
//                     </button>
//                     <div  className=" bg-[gray] flex flex-row justify-center rounded-md p-2 w-[200px] text-white font-bold text-sm h-10 cursor-pointer" onClick={()=>router.back()}> Cancel</div>

//                 </div>
//             </form>
//             <Toaster/>
//         </div>
//     )
// }

// export default AddMediaContainer


"use client";
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import Breadcrumbs from '@/components/BreadCrumbs';
import SuccessModal from '@/components/modal/SuccessfullModal';
// import Breadcrumbs from '@/components/BreadCrumbs';

const AddMediaContainer = () => {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const router = useRouter();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            altText: "",
            description: "",
            file: null
        },
        validationSchema: Yup.object().shape({
            file: Yup.mixed().required('File is required')
                .test('fileFormat', 'Only png, jpg and jpeg files are allowed', value => {
                    if (value) {
                        const supportedFormats = ['png', 'jpg', 'jpeg'];
                        //@ts-ignore
                        return supportedFormats.includes(value?.name?.split('.').pop());
                    }
                    return true;
                }),
            name: Yup.string().required('Name is required'),
            description: Yup.string().required('Description is required'),
            altText: Yup.string().required('Alternative text is required'),
        }),
        onSubmit: async (values: any) => {
            try {
                setLoading(true);
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                    formData.append(key, values[key]);
                });

                const response = await fetch('/api/image-upload', {
                    method: 'POST',
                    body: formData
                });

                if(response.status === 400) {
                    setLoading(false);
                    throw new Error(response.statusText);
                }
                const responseData = await response.json();
                if(response.status){
                    setIsSuccessModalOpen(true);
                    setLoading(false);
                    toast.success('Upload successful');
                    setTimeout(() => {
                        router.push('/admin/dashboard/media');
                    }, 2000);
                }
            } catch (error) {
                setLoading(false);
                console.error('Error:', error);
            }
        }
    });

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        formik.setFieldValue('file', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Media", href: "/admin/dashboard/media" },
        { label: "Add Media" },
    ];
    return (
       
        <div className='flex justify-start flex-col gap-2 items-center rounded-lg w-full shadow-lg py-5 h-[calc(100vh-80px)] overflow-y-auto mt-16'>
            <Breadcrumbs items={breadcrumbItems} />
           
            <div className='w-full py-3 bg-black uppercase text-white px-8 rounded-t-lg text-base'>
                Add Media
            </div>
            <form onSubmit={formik.handleSubmit} className='mt-4 w-full flex justify-center items-center flex-col' encType="multipart/form-data">
                <div className="px-5 w-[100%] justify-center grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                    <div className="">
                        <label className="font-semibold text-sm text-gray-600 block">Image Name</label>
                        <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-sm">{formik.errors.name.toString()}</div>
                        ) : null}
                    </div>
                    <div className="">
                        <label className="font-semibold text-sm text-gray-600 block">Image Alternative Text</label>
                        <input type="text" id="altText" name="altText" onChange={formik.handleChange} value={formik.values.altText} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" />
                        {formik.touched.altText && formik.errors.altText ? (
                            <div className="text-red-500 text-sm">{formik.errors.altText.toString()}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <label className="font-semibold text-sm text-gray-600 block">Select Image</label>
                        <input type="file" id="file" accept='image/png, image/jpeg, image/jpg' name="file" onChange={handleFileChange} className="border rounded-lg px-3 py-1.5 mt-1 mb-[1px] text-sm w-full" />
                        {formik.touched.file && formik.errors.file ? (
                            <div className="text-red-500 text-sm">{formik.errors.file.toString()}</div>
                        ) : null}
                        {preview && (
                            <div className="mt-4">
                                <img src={preview} alt="Preview" className="max-w-full h-auto rounded-lg border border-gray-300" />
                            </div>
                        )}
                    </div>
                    <div className="col-span-2">
                        <label className="font-semibold text-sm text-gray-600 block">Image Description</label>
                        <textarea id="description" name="description" onChange={formik.handleChange} value={formik.values.description} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" rows={3} />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="text-red-500 text-sm">{formik.errors.description.toString()}</div>
                        ) : null}
                    </div>
                </div>
                <div className="mt-5 pl-5 pr-5 flex flex-row gap-5">
                    <button type="submit" className="transition duration-500 w-[150px] bg-blue-950 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white py-2.5 px-8 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                        {loading ? (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <ClipLoader size={20} color="#000" />
                            </div>
                        ) : (
                            "Upload"
                        )}
                    </button>
                    <button type="button" className="bg-gray-500 text-white px-12 py-2 rounded-md" onClick={() => router.back()}>
                        Cancel
                    </button>
                </div>
            </form>
            <Toaster />
            <SuccessModal
            
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
        </div>
    );
};

export default AddMediaContainer;
