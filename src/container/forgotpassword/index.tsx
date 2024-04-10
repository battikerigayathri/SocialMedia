"use client"
import React from "react"
import { useFormik } from 'formik';
import * as  yup from "yup";

const validationSchema = yup.object().shape({
    email: yup.string().required("Please enter valid E-mail"),
  });

const Forgotpassword=()=>{
    const formik=useFormik({
        initialValues:{
            email:"",
        },
        validationSchema: validationSchema,
        onSubmit:values=>{
            alert(JSON.stringify(values, null, 2));
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
        <label className="font-semibold text-sm text-gray-600  block">Email</label>
        
        <input type="email" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm ">{formik.errors.email}</div>
        ) : null}
        <div className="mt-5">
        <button type="submit" className="transition duration-500  bg-blue-950 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span className="inline-block mr-2">Send</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
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