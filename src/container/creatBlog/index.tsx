"use client"
import { serverFetch } from '@/action'
import { useLazyQuery } from '@/hook'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

function CreatBlog() {
    const [loading, setLoading] = useState(false)
    const [craeteBlogfun, craeteBlogResponse] = useLazyQuery(serverFetch)
    const [keywordstr,setKeywordstr]=useState('')
useEffect(()=>{
    if(keywordstr){
        // keywordstr.split(,)
    }
},[keywordstr])
    return (
        <div className='flex flex-col w-[calc(100vw-260px)] gap-5'>
            {/* <div className='flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center'>
                <h4 className='text-center font-bold text-[20px]'>Settings</h4>
            </div> */}
            <div className="shadow-md rounded-b-lg ">
                <div className='bg-black h-10 rounded-t-lg flex flex-col justify-center font-medium p-2 text-white'>
                    Creat Blog
                </div>
                <div className='flex flex-row justify-center items-center align-middle p-3'>
                    <Formik
                        initialValues={{
                            author: '', category: '', description: '', featured: '', keywords: '', metaDescription: '', metaTitle: '', pin: '', thumbnail: '', title: '', status: '',
                        }}
                        // validationSchema={validationSchema}
                        enableReinitialize={true}
                        onSubmit={async (values, { resetForm }) => {
                            console.log(values, "values")
                            try {
                                setLoading(true)
                                craeteBlogfun(`
                        mutation CreateBlog($input: BlogInput!) {
                            createBlog(input: $input) {
                              description
                              metaDescription
                              metaTitle
                              thumbnail {
                                id
                                name
                                mediaType
                                type
                                path
                                altText
                                description
                              }
                              title
                              keywords
                              pin
                              status
                              featured
                              id
                              category {
                                id
                                name
                                status
                                createdOn
                                updatedOn
                              }
                            }
                          }
                        `, {
                                    "input": {
                                        "author": values?.author,
                                        "category": values?.category,
                                        "description": values?.description,
                                        "featured": values?.featured,
                                        "keywords": values?.keywords,
                                        "metaDescription": values?.metaDescription,
                                        "metaTitle": values?.metaTitle,
                                        "pin": values?.pin,
                                        "thumbnail": values?.thumbnail,
                                        "title": values?.title,
                                        "status": values?.status
                                    }
                                }, {
                                    cache: 'no-store',
                                })
                            } catch (e) {
                                console.log(e)
                                setLoading(false)

                            }
                            setLoading(false)

                        }}
                    >
                        {(props) => (
                            <Form>
                                <div className='flex flex-col item-center gap-5 justify-center items-center'>

                                    <div className="flex flex-row gap-y-5 gap-x-5 flex-wrap  justify-center  w-[80%]">
                                        <Field name="title">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2 '>
                                                    <label className="font-semibold text-sm   block w-20 ">Title</label>
                                                    <input {...field} type="text" placeholder="Title" className="border-2 bg-gray-50 p-2 rounded w-[400px]" style={{
                                                        border: `${meta.touched && meta.error
                                                            ? "2px solid red"
                                                            : "1px solid gray"
                                                            }`,
                                                    }} />
                                                </div>

                                            )}
                                        </Field>
                                        {/* <Field name="heading">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  w-20">Heading</label>

                                                    <input {...field} type="text" placeholder="Heading" className="border-2 bg-gray-50 p-2 rounded w-[400px]" style={{
                                                        border: `${meta.touched && meta.error
                                                            ? "2px solid red"
                                                            : "1px solid gray"
                                                            }`,
                                                    }} />
                                                </div>

                                            )}
                                        </Field> */}

                                        <Field name="metaTitle">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  w-20">Meta Title</label>

                                                    <input {...field} type="text" placeholder="Meta title" className="border-2 bg-gray-50 p-2 rounded w-[400px]" style={{
                                                        border: `${meta.touched && meta.error
                                                            ? "2px solid red"
                                                            : "1px solid gray"
                                                            }`,
                                                    }} />
                                                </div>

                                            )}
                                        </Field>

                                        <Field name="metaDescription">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  ">Meta Description</label>

                                                    <input {...field} type="text" placeholder="Meta description" className="border-2 bg-gray-50 p-2 rounded w-[400px] h-[41.6px]" style={{
                                                        border: `${meta.touched && meta.error
                                                            ? "2px solid red"
                                                            : "1px solid gray"
                                                            }`,
                                                    }} />

                                                </div>

                                            )}
                                        </Field>
                                        <Field name="description">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  ">Description</label>

                                                    <textarea {...field} className="border-2 bg-gray-50 p-2 rounded w-[400px] h-[41.6px]"
                                                        placeholder="Description"
                                                        style={{
                                                            resize: 'vertical',
                                                            border: `${meta.touched && meta.error
                                                                ? "2px solid red"
                                                                : "1px solid gray"
                                                                }`,
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </Field>
                                        <Field name="status">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  ">Status</label>

                                                    <select
                                                        {...field}
                                                        className="border-2 bg-gray-50 p-2 rounded w-[400px] h-[41.6px]"
                                                        style={{
                                                            border: `${meta.touched && meta.error ? "2px solid red" : "1px solid gray"
                                                                }`,
                                                        }}
                                                    >
                                                        <option value="" disabled selected>
                                                            Select a status
                                                        </option>
                                                        <option value="PUBLISH"  >
                                                            PUBLISH
                                                        </option>
                                                        <option value="DRAFT" >
                                                            DRAFT
                                                        </option>
                                                        <option value="TRASH" >
                                                            TRASH
                                                        </option>
                                                    </select>
                                                </div>
                                            )}
                                        </Field>

                                        <Field name="keywords">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  ">Keywords</label>

                                                    <textarea {...field} className="border-2 bg-gray-50 p-2 rounded w-[400px] h-[41.6px]"
                                                        placeholder="Keywords"
                                                        style={{
                                                            resize: 'vertical',
                                                            border: `${meta.touched && meta.error
                                                                ? "2px solid red"
                                                                : "1px solid gray"
                                                                }`,
                                                        }}
                                                        onChange={(e)=>setKeywordstr(e.target.value)}
                                                    />
                                                </div>
                                            )}
                                        </Field>
                                        <Field name="pin">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  ">pin</label>
                                                    <div className='flex flex-row w-[400px] h-[41.6px]'>

                                                        <input
                                                            {...field}
                                                            class="form-check-input me-2"
                                                            type="checkbox"
                                                            id="pin"
                                                            // possible={true}
                                                            style={{
                                                                border: `${meta.touched && meta.error
                                                                    ? "2px solid red"
                                                                    : "1px solid gray"
                                                                    }`,
                                                                width: 13,
                                                                height: 12,
                                                                marginTop: 5,

                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label contactLabel"
                                                        // for="form4Example4"
                                                        >
                                                            Pin
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </Field>
                                        <Field name="featured">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  ">Featured</label>
                                                    <div className='flex flex-row w-[400px] h-[41.6px]'>

                                                        <input
                                                            {...field}
                                                            class="form-check-input me-2"
                                                            type="checkbox"
                                                            id="featured"
                                                            // possible={true}
                                                            style={{
                                                                border: `${meta.touched && meta.error
                                                                    ? "2px solid red"
                                                                    : "1px solid gray"
                                                                    }`,
                                                                width: 13,
                                                                height: 12,
                                                                marginTop: 5,

                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label contactLabel"
                                                        // for="form4Example4"
                                                        >
                                                            Featured
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </Field>

                                    </div>
                                    <div className='flex flex-row gap-y-5 gap-x-5 flex-wrap justify-center'>

                                        <button type="submit" className=" bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10 w-[100px]" onClick={() => DeleteUser()}> {loading ? (
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
                                            "Submit"
                                        )}</button>
                                    </div>
                                </div>

                            </Form>
                        )
                        }
                    </Formik >
                </div >
            </div >
        </div >)
}

export default CreatBlog