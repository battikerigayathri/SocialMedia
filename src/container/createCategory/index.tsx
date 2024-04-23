"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLazyQuery } from '@/hook';
import { serverFetch } from "@/action";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const validationSchema = yup.object().shape({
  catname: yup.string().required("catname is required"),
  status: yup
    .string()
    .required("status is required")    
});

const CreateCategory = () => {
  const router = useRouter();
    const [Categoryfunction, { data ,error,loading }] = useLazyQuery(serverFetch);
  const formik = useFormik({
    initialValues: {
      catname: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        Categoryfunction(
            `
            mutation CreateCategory($input: CategoryInput!) {
              createCategory(input: $input) {
                id
                name
                status
                createdOn
                updatedOn
              }
            }
            `,
            {
              "input": {
                "name": values.catname,
                "status": values.status
              }
              
            } ,
            {
              cache: 'no-store',
            }   

            )
    },
  });

  useEffect(()=>{
    if(data)
      {
        router.push('/admin/dashboard/category');
      }
    console.log('myerror',error)
  },[data, error])

const MakeCategory=()=>{

   

}





  
  return (
    <div className="flex flex-col mt-8">
    <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
            className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
                <thead>
                    <tr>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-black">
                           Create Category</th>    
                    </tr>
                </thead>

                <tbody className="bg-white">
                   
                     
                            <tr>
                                <div className="p-3 flex flex-row justify-center">
                                <form onSubmit={formik.handleSubmit}>
      <div className="px-5  w-[100%]  justify-center grid grid-cols-2 gap-3">
        <div className="">
        <label className="font-semibold text-sm text-gray-600  block">Cat Name</label>
        <input type="text" id="catname" name="catname" onChange={formik.handleChange} value={formik.values.catname}className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" />
        
        {formik.touched.catname && formik.errors.catname ? (
          <div className="text-red-500 text-sm ">{formik.errors.catname}</div>
        ) : null}
        </div>
        <div className="">
        
        <label className="font-semibold text-sm text-gray-600  block">Status</label>
        
        <select  className="border rounded-lg px-3 py-[9px] mt-1 mb-[1px] text-sm w-full"  name="status" onChange={formik.handleChange} value={formik.values.status}

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
        {formik.touched.status && formik.errors.status ? (
          <div className="text-red-500 text-sm ">{formik.errors.status}</div>
        ) : null}
            
            </div>
            
      
      </div>
        <div className="mt-5 pl-5 pr-5">
        <button type="submit" className="transition duration-500  bg-blue-950 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span className="inline-block mr-2">Submit</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </button>
        </div>
        </form>
                                </div>
                        

                              
                            </tr>
                                            

                </tbody>
            </table>
        </div>
    </div>
</div>
  );
};
export default CreateCategory;
