"use client"
import React from "react"
import { useFormik } from 'formik';
import * as  yup from "yup";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";

const validationSchema = yup.object().shape({
  userName: yup.string().required("Please enter user name"),
  password: yup.string().required("Please enter password"),

  });

const Forgotpassword=()=>{

  const [forgotPawwordFun, { data, loading, error }] = useLazyQuery(serverFetch)

    const formik=useFormik({
        initialValues:{
            userName:"",
            password:""
        },
        validationSchema: validationSchema,
        onSubmit:values=>{
          // forgotPawwordFun(
          //   `mutation Login($userName: String, $password: String) {
          //           login(userName: $userName, password: $password) {
          //             token
          //             msg
          //           }
          //         }
          //         `,
          //   {
          //     "userName": values.username,
          //     "password": values.password
          //   }
    
    
          // )
        },
    });
    return(
<>
<div>

<div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
  <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
    <h1 className="font-bold text-center text-2xl mb-5">Forgot Password</h1> 
    
    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
    <form onSubmit={formik.handleSubmit}>
      <div className="px-5 py-7">
        <div>
        <label className="font-semibold text-sm text-gray-600  block">User Name</label>
        
        <input type="text" id="userName" name="userName" onChange={formik.handleChange} value={formik.values.userName} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" />
        {formik.touched.userName && formik.errors.userName ? (
          <div className="text-red-500 text-sm ">{formik.errors.userName}</div>
        ) : null}
        </div>
        <div className="mt-5">
        <label className="font-semibold text-sm text-gray-600  block">Password</label>
        
        <input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm ">{formik.errors.password}</div>
        ) : null}
        </div>
        <div className="mt-5">
        <button type="submit" className="transition duration-500  bg-blue-950 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span className="inline-block mr-2">Send</span>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg> */}
        </button>
        </div>
      </div>
        </form>
 
    </div>
  
 
  </div>
</div>
 
</div>
</>
    )
}
export default Forgotpassword