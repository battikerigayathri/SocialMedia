
"use client"
import React, { useEffect } from "react"
import { useFormik } from 'formik';
import * as  yup from "yup";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import { setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from "next/navigation";
import { error } from "console";
import toast, { Toaster } from 'react-hot-toast';
import { ClipLoader } from "react-spinners";

const validationSchema = yup.object().shape({
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword:
      yup.string()
        .oneOf([yup.ref("password")], "Passwords Must Match")
        .required("Confirm Password Required"),
});

const ResetPassword = () => {
  const currentPath = useSearchParams()
    console.log(currentPath.get("email"), "pathSegments")
  const [resetPasswordFun, { data, loading, error }] = useLazyQuery(serverFetch)
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: validationSchema,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      resetPasswordFun(
        `mutation ResetPassword($email: String, $newPassword: String) {
          resetPassword(email: $email, newPassword: $newPassword) {
            msg
          }
        }
              `,
              {
                "email": currentPath.get("email"),
                "newPassword": values.password
              }


      )
    },
  });

  useEffect(() => {
    if (data) {
      toast.success("Password changed successfully")
      router.push('/admin/dashboard')
    }
    else if(error){
toast.error(error.message)
    }
  }, [data, loading, error])
  return (

    <div>
      <div className="min-h-auto bg-gray-100 flex flex-col h-[calc(100vh-40px)] justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">Blog Management</h1>

          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form onSubmit={formik.handleSubmit}>
              <div className="px-5 py-7">
                <label className="font-semibold text-sm text-gray-600  block">Password</label>
                <input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" />

                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm ">{formik.errors.password}</div>
                ) : null}
                <label className="font-semibold text-sm text-gray-600  block">Confirm password</label>

                <input type="password" id="confirmPassword" name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full" />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="text-red-500 text-sm ">{formik.errors.confirmPassword}</div>
                ) : null}
                <div className="mt-5">
                  <button type="submit" className="transition duration-500  bg-blue-950 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                    {/* <span className="inline-block mr-2">Change password</span> */}
                    {loading ? (
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
                                                "Change password"
                                            )}  
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
<Toaster/>
    </div>
  )
}
export default ResetPassword