"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Field, Form, Formik, FormikProps } from "formik";
import { useLazyQuery } from '@/hook';
import { serverFetch } from '@/action';
import { BeatLoader, ClipLoader } from 'react-spinners';
import Link from 'next/link';
function ViewUser() {
    const [loading, setLoading] = useState(false)

    const [getUserfun, getUserResponse] = useLazyQuery(serverFetch)
    const [updateUserfun, updateUserResponse] = useLazyQuery(serverFetch)
    const [deleteUserfun, deleteUserResponse] = useLazyQuery(serverFetch)


    const router = useRouter()
    const currentPath = useSearchParams()
    const path = usePathname()
    const pathSegments = path
        .split("/")
        .filter((segment) => segment !== "");
    console.log(currentPath.get("id"), "pathSegments")
    console.log(currentPath.get("edit"), "pathSegments")
const disabled=(currentPath.get("edit")==="true")
console.log(disabled,typeof(disabled),"disabled")
    console.log(pathSegments, "pathSegments")
    useEffect(() => {
        getUserfun(`
    query GetUser($where: whereUserInput!) {
        getUser(where: $where) {
          id
          firstName
          lastName
          userName
          email
          role
          status
          createdOn
          updatedOn
        }
      }
    `, {
            "where": {
                "id": {
                    is: currentPath.get("id")
                }
            }
        }, {
            cache: 'no-store',
        })
    }, [])
    useEffect(() => {
        if (getUserResponse?.data?.getUser) {
            console.log(getUserResponse?.data?.getUser, "user")
        }
    }, [getUserResponse])
    useEffect(() => {
        if (updateUserResponse?.data?.updateUser) {
            console.log(updateUserResponse?.data?.updateUser, "UpdateUser")
            router.push('/admin/dashboard/users')
        }
    }, [updateUserResponse])
    useEffect(() => {
        if (deleteUserResponse?.data) {
            router.push('/admin/dashboard/users')
        }
    }, [deleteUserResponse])
    const DeleteUser= ()=>{
        deleteUserfun(`
mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }`,{
    "deleteUserId": currentPath.get("id")
  },{
    cache: 'no-store',
})
    }
 
    return (
        <div className='flex flex-col w-[calc(100vw-260px)] gap-5'>
            {/* <div className='flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center'>
                <h4 className='text-center font-bold text-[20px]'>user</h4>
            </div> */}
            <div className="shadow-md rounded-b-lg ">
                <div className='bg-black h-10 rounded-t-lg flex flex-col justify-center font-medium p-2 text-white'>
                <h4 className=' font-medium text-[14px]'>User</h4>

                    {/* {updateSettings?"Change your settings here":"Your settings"} */}
                </div>
                {getUserResponse?.loading ?<div className='flex flex-row justify-center items-center'> <BeatLoader color="gray" size={20} /></div>:
                <div className='flex flex-row justify-center items-center align-middle p-3'>
            <Formik
                initialValues={{
                    firstName: getUserResponse?.data?.getUser?.firstName,
                    lastName: getUserResponse?.data?.getUser?.lastName,
                    email: getUserResponse?.data?.getUser?.email,
                    userName: getUserResponse?.data?.getUser?.userName,
                    role: getUserResponse?.data?.getUser?.role,
                    status: getUserResponse?.data?.getUser?.status,

                }}
                // validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={async (values, { resetForm }) => {
                    console.log(values, "values")
                    try {
                        setLoading(true)
                        updateUserfun(`
                        mutation UpdateUser($input: updateUserInput!) {
                            updateUser(input: $input) {
                              id
                              firstName
                              lastName
                              userName
                              email
                              role
                              status
                              createdOn
                              updatedOn
                            }
                          }
                        `, {
                            "input": {
                                "firstName": values?.firstName,
                                "lastName": values?.lastName,
                                "status": values?.status,
                                id:currentPath.get("id")
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
                        <div className='flex flex-col item-center gap-5 justify-center '>

                            <div className="flex flex-row gap-y-5 gap-x-5 flex-wrap  justify-center">
                                <Field name="firstName">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <div className='flex flex-row gap-2 items-center'>
                                            <label className="font-semibold text-sm   block w-20">First Name</label>
                                            <input {...field} type="text" disabled={!disabled} placeholder="First Name*" className="border-2 bg-gray-50 p-2 rounded" style={{
                                                border: `${meta.touched && meta.error
                                                    ? "2px solid red"
                                                    : "1px solid gray"
                                                    }`,
                                            }} />
                                        </div>

                                    )}
                                </Field>
                                <Field name="lastName">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <div className='flex flex-row gap-2 items-center'>
                                            <label className="font-semibold text-sm   block  w-20">Last Name</label>

                                            <input {...field} type="text" placeholder="Last Name*" disabled={!disabled} className="border-2 bg-gray-50 p-2 rounded" style={{
                                                border: `${meta.touched && meta.error
                                                    ? "2px solid red"
                                                    : "1px solid gray"
                                                    }`,
                                            }} />
                                        </div>

                                    )}
                                </Field>

                                <Field name="email">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <div className='flex flex-row gap-2 items-center'>
                                            <label className="font-semibold text-sm   block  w-20">Email</label>

                                            <input {...field} disabled type="email" placeholder="email*" className="border-2 bg-gray-50 p-2 rounded" style={{
                                                border: `${meta.touched && meta.error
                                                    ? "2px solid red"
                                                    : "1px solid gray"
                                                    }`,
                                            }} />
                                        </div>

                                    )}
                                </Field>

                                <Field name="userName">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <div className='flex flex-row gap-2 items-center'>
                                            <label className="font-semibold text-sm   block  w-20">User Name</label>

                                            <input {...field} disabled type="text" placeholder="userName*" className="border-2 bg-gray-50 p-2 rounded" style={{
                                                border: `${meta.touched && meta.error
                                                    ? "2px solid red"
                                                    : "1px solid gray"
                                                    }`,
                                            }} />

                                        </div>

                                    )}
                                </Field>
                                <Field name="role">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <div className='flex flex-row gap-2 items-center'>
                                            <label className="font-semibold text-sm   block  w-20">Role</label>

                                            <select
                                                {...field}
                                                disabled
                                                className="border-2 bg-gray-50 p-2 rounded w-[233.6px]"
                                                style={{
                                                    border: `${meta.touched && meta.error ? "2px solid red" : "1px solid gray"
                                                        }`,
                                                }}
                                            >
                                                <option value="USER" disabled selected>
                                                    User
                                                </option>
                                            </select>
                                        </div>
                                    )}
                                </Field>
                                <Field name="status">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <div className='flex flex-row gap-2 items-center'>
                                            <label className="font-semibold text-sm   block  w-20">Status</label>

                                            <select
                                                {...field}
                                                disabled={!disabled}
                                                className="border-2 bg-gray-50 p-2 rounded w-[233.6px]"

                                                style={{
                                                    border: `${meta.touched && meta.error ? "2px solid red" : "1px solid gray"
                                                        }`,
                                                }}
                                            >
                                                <option value="" disabled selected>
                                                    Select a status
                                                </option>
                                                <option value="ACTIVE"  >
                                                    Active
                                                </option>
                                                <option value="IN_ACTIVE" >
                                                    In Active
                                                </option>
                                            </select>
                                        </div>
                                    )}
                                </Field>

                            </div>
                            <div className='flex flex-row gap-y-5 gap-x-5 flex-wrap justify-center'>
                                {currentPath.get("edit") == "true" ?
                                    <button type="submit" className=" bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10 w-[100px]"> {loading ? (
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
                                        "update"
                                    )}</button> : <div className=" bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10 w-[100px] text-center" onClick={()=>router.push(`view?edit=true&id=${currentPath.get("id")}`)}>
                                        Edit
                                    </div>}
                                <button type="submit" className=" bg-red-700 rounded-md p-2 text-white font-bold text-sm h-10 w-[100px]" onClick={()=>DeleteUser()}> {loading ? (
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
                                )}</button>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
                </div>}
                </div>
        </div>

    )
}

export default ViewUser