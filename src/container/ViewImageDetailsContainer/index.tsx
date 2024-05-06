"use client"
import { serverFetch } from '@/action'
import { useLazyQuery } from '@/hook'
import { useFormik } from 'formik'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BeatLoader, ClipLoader } from 'react-spinners'
import * as Yup from 'yup';

const ViewImageDetailsContainer = () => {
    const [getAssetData, { data, loading, error }] = useLazyQuery(serverFetch);
    const [updateAsset, updateAssetResponse] = useLazyQuery(serverFetch);
    const[deleteLoader,setDeleteLoader]=useState(false)

    const { assetId } = useParams();
    const edit = useSearchParams().get('edit') === 'true';
    const [initialValues, setInitialValues] = useState({
        name: '',
        altText: "",
        description: "",
        path: null
    });
    const router = useRouter();
    useEffect(() => {
        getAssetData(
            `query GetAsset($where: whereAssetInput!) {
                getAsset(where: $where) {
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
              }`,
            {
                "where": {
                    "id": {
                        "is": assetId
                    }
                }
            },
            {
                cache: "no-store"
            }
        );
    }, [])

    useEffect(() => {
        if (data) {
            setInitialValues(data?.getAsset);
        }
    }, [data, loading, error])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            description: Yup.string().required('Description is required'),
            altText: Yup.string().required('Alternative text is required'),
        }),
        onSubmit: async (values: any) => {

            updateAsset(
                `mutation UpdateAsset($input: updateAssetInput!) {
                    updateAsset(input: $input) {
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
                  }`,
                {
                    "input": {
                        "id": assetId,
                        "name": values.name,
                        "altText": values.altText,
                        "description": values.description,
                    }
                },
                {
                    cache: "no-store"
                }
            )
        }
    })

    useEffect(() => {
        if (updateAssetResponse.data) {
            router.replace('/admin/dashboard/media');
        }
        if (updateAssetResponse.error) {
            console.log("error : ", updateAssetResponse.error);
        }
    }, [updateAssetResponse.data, updateAssetResponse.error, updateAssetResponse.loading])

    async function handleDelete() {
        try {
            setDeleteLoader(true)
            const response = await fetch(`/api/delete-image/${assetId}`, {
                method: "DELETE"
            })
            console.log(response);

            if (response.ok) {
                setDeleteLoader(false)
                router.push('/admin/dashboard/media');
            }

        } catch (error: any) {
            setDeleteLoader(false)

            console.log('Error:', error.message);
        }
    }

    function handleUpdate() {
        const values = formik.values;
        console.log(values);

        updateAsset(
            `mutation UpdateAsset($input: updateAssetInput!) {
                    updateAsset(input: $input) {
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
                  }`,
            {
                "input": {
                    "id": assetId,
                    "name": values.name,
                    "altText": values.altText,
                    "description": values.description,
                }
            },
            {
                cache: "no-store"
            }
        )
    }

    return (
        <div className='flex justify-start flex-col gap-2 items-center rounded-lg w-full shadow-lg py-5 h-[calc(100vh-80px)] overflow-y-auto'>
            <div className='w-full py-3 bg-black uppercase text-white px-8 rounded-t-lg text-base'>
                {edit ? "Edit" : "View"} Media
            </div>
            {loading ? 
            <div className='flex justify-center items-center'>
                <BeatLoader size={20} color='lightgray'/>
            </div>
        :
                <form onSubmit={formik.handleSubmit} className='mt-4 w-full flex justify-center items-center flex-col'>
                    <div className="px-5  w-[100%]  justify-center grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3">
                        <div className="">
                            <label className="font-semibold text-sm text-gray-600  block">Image Name</label>
                            <input disabled={!edit} type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" />

                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500 text-sm ">{formik.errors.name.toString()}</div>
                            ) : null}
                        </div>
                        <div className="">
                            <label className="font-semibold text-sm text-gray-600  block">Image Alternative Text</label>
                            <input disabled={!edit} type="text" id="altText" name="altText" onChange={formik.handleChange} value={formik.values.altText} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" />

                            {formik.touched.altText && formik.errors.altText ? (
                                <div className="text-red-500 text-sm ">{formik.errors.altText.toString()}</div>
                            ) : null}
                        </div>
                        <div className="col-span-2">
                            <label className="font-semibold text-sm text-gray-600  block">Image Description</label>
                            <textarea disabled={!edit} id="description" name="description" onChange={formik.handleChange} value={formik.values.description} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" rows={3} />

                            {formik.touched.description && formik.errors.description ? (
                                <div className="text-red-500 text-sm ">{formik.errors.description.toString()}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className='flex justify-center items-center w-full'>
                        <img className='h-[280px]' src={formik.values.path} alt={formik.values.altText} />
                    </div>
                    <div className="mt-5 pl-5 pr-5">
                        {!edit ?<div className='flex flex-row gap-5'> <button type='button' className="transition duration-500 w-[200px] bg-blue-950 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white  py-2.5 px-8 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block" onClick={() => {
                            router.push('?edit=true');
                        }}>
                            <span className="inline-block mr-2">Edit</span>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg> */}
                        </button>
                        <div  className=" bg-[gray] flex flex-row justify-center rounded-md p-2 w-[200px] text-white font-bold text-sm h-10 cursor-pointer" onClick={()=>router.back()}> Cancel</div>

                        </div>
                            :
                            <div className='flex w-fit justify-center items-center gap-5'>
                                <button type="submit" onClick={handleUpdate} className="transition duration-500 bg-blue-950 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-[200px] py-2.5 px-8 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                {updateAssetResponse?.loading ? (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <ClipLoader size={20} color="#000" />
                                                </div>
                                            ) : (
                                                "Update"
                                            )}
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg> */}
                                </button>
                                <div  className=" bg-[gray] flex flex-row justify-center rounded-md p-2 w-[200px] text-white font-bold text-sm h-10 cursor-pointer" onClick={()=>router.back()}> Cancel</div>

                                <button type='button' onClick={handleDelete} className="transition duration-500 bg-red-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-[200px] py-2.5 px-8 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                {deleteLoader ? (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <ClipLoader size={20} color="#000" />
                                                </div>
                                            ) : (
                                                "Delete"
                                            )}
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg> */}
                                </button>
                            </div>
                        }
                    </div>
                </form>
            }
        </div>
    )
}

export default ViewImageDetailsContainer