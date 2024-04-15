"use client"
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'

function CreatBlog() {
    const [loading,setLoading]=useState(false)
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
                    

                }}
                // validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={async (values, { resetForm }) => {
                    console.log(values, "values")
                    try {
                        setLoading(true)
                        // updateUserfun(`
                        // mutation UpdateUser($input: updateUserInput!) {
                        //     updateUser(input: $input) {
                        //       id
                        //       firstName
                        //       lastName
                        //       userName
                        //       email
                        //       role
                        //       status
                        //       createdOn
                        //       updatedOn
                        //     }
                        //   }
                        // `, {
                        //     "input": {
                        //         // "firstName": values?.firstName,
                        //         // "lastName": values?.lastName,
                        //         // "status": values?.status,
                        //         // id:currentPath.get("id")
                        //     }
                        // }, {
                        //     cache: 'no-store',
                        // })
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
                                <Field name="slug">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <div className='flex flex-col gap-2 '>
                                            <label className="font-semibold text-sm   block w-20 ">Slug</label>
                                            <input {...field} type="text"  placeholder="Slug" className="border-2 bg-gray-50 p-2 rounded w-[400px]" style={{
                                                border: `${meta.touched && meta.error
                                                    ? "2px solid red"
                                                    : "1px solid gray"
                                                    }`,
                                            }} />
                                        </div>

                                    )}
                                </Field>
                                <Field name="heading">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <div className='flex flex-col gap-2'>
                                            <label className="font-semibold text-sm   block  w-20">Heading</label>

                                            <input {...field} type="text" placeholder="Heading"  className="border-2 bg-gray-50 p-2 rounded w-[400px]" style={{
                                                border: `${meta.touched && meta.error
                                                    ? "2px solid red"
                                                    : "1px solid gray"
                                                    }`,
                                            }} />
                                        </div>

                                    )}
                                </Field>

                                <Field name="Meta Title">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <div className='flex flex-col gap-2'>
                                            <label className="font-semibold text-sm   block  w-20">Meta Title</label>

                                            <input {...field} disabled type="text" placeholder="Meta title" className="border-2 bg-gray-50 p-2 rounded w-[400px]" style={{
                                                border: `${meta.touched && meta.error
                                                    ? "2px solid red"
                                                    : "1px solid gray"
                                                    }`,
                                            }} />
                                        </div>

                                    )}
                                </Field>

                                <Field name="Meta Description">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <div className='flex flex-col gap-2'>
                                            <label className="font-semibold text-sm   block  w-20">Meta Description</label>

                                            <input {...field} disabled type="text" placeholder="Meta description" className="border-2 bg-gray-50 p-2 rounded w-[400px]" style={{
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
                                                    <textarea {...field} className="border-2 bg-gray-50 p-2 rounded w-[400px]"
                                                        placeholder="Description"
                                                        style={{
                                                            resize: 'vertical',
                                                            border: `${meta.touched && meta.error
                                                                ? "2px solid red"
                                                                : "1px solid gray"
                                                                }`,
                                                        }}
                                                    />
                                                )}
                                            </Field>

                            </div>
                            <div className='flex flex-row gap-y-5 gap-x-5 flex-wrap justify-center'>

                                <button type="submit" className=" bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10 w-[100px]" onClick={()=>DeleteUser()}> {loading ? (
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
                )}
            </Formik>
                </div>
            </div>
        </div>)
}

export default CreatBlog