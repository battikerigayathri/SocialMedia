

"use client"
import React, { useEffect } from "react"
import { useFormik } from 'formik';
import * as  yup from "yup";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import { setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from "next/navigation";
import OtpInput from 'react-otp-input';
import toast, { Toaster } from 'react-hot-toast';
import { ClipLoader } from "react-spinners";

const validationSchema = yup.object().shape({
    otp: yup.string().required("Enter OTP").min(4, "Enter valid OTP"),
   
});

const OTP = () => {

    const currentPath = useSearchParams()
    console.log(currentPath.get("email"), "pathSegments")

    const [otpfun, { data, loading, error }] = useLazyQuery(serverFetch)
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            otp: "",
        },

        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values)
            otpfun(
                `mutation VerifyOtp($email: String, $otp: String) {
  verifyOtp(email: $email, otp: $otp) {
    msg
  }
}`, {
                "email": currentPath.get("email"),
                "otp": values.otp
            }, {
                cache: 'no-store',
            }
            )

        },
    });

    useEffect(() => {
        if (data) {
            toast.success("OTP verified")
            setTimeout(() => {
                router.push(`/resetpassword?email=${currentPath.get("email")}`)
            }, 2000);
        }
        else if (error) {
            toast.error(error.message)
        }
    }, [data, loading, error])
    return (

        <div>
            <div className="min-h-auto bg-gray-100 flex flex-col h-[calc(100vh-40px)] justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5">Verify OTP</h1>

                    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="px-5 py-7">
                                <label className="font-semibold text-sm text-gray-600  block">OTP</label>
                                <OtpInput
                                    value={formik.values.otp}
                                    onChange={(otp) => formik.setFieldValue('otp', otp)}
                                    numInputs={4}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                    inputStyle={{ border: "2px solid gray", width: 40, height: 40, borderRadius: 5 }}
                                />
                                {formik.touched.otp && formik.errors.otp ? (
                                    <div className="text-red-500 text-sm ">{formik.errors.otp}</div>
                                ) : null}

                                <div className="mt-5">
                                    <button type="submit" className="transition duration-500  bg-blue-950 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                        {/* <span className="inline-block mr-2">Verify OTP</span> */}
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
                                                "Verify OTP"
                                            )}                                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg> */}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster />

        </div>
    )
}
export default OTP