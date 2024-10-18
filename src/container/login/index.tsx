"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [loginpage, { data, loading, error }] = useLazyQuery(serverFetch);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      loginpage(
        `mutation Login($userName: String, $password: String) {
          login(userName: $userName, password: $password) {
            msg
            token
            role
            user
          }
        }
              `,
        {
          userName: values.username,
          password: values.password,
        }
      );
    },
  });

  useEffect(() => {
    if (data) {
      setCookie('tokenkey',data.login.token)
      setCookie('UserRole',data.login.role)
      setCookie('UserId',data.login.user)

      router.push("/admin/dashboard");
    } else if (error) {
      toast.error(error.message);
    }
  }, [data, loading, error]);
  return (
    <div>
      <div className="min-h-auto bg-gray-100 flex flex-col h-[100vh] justify-center sm:py-12 ">
        <div className="flex justify-center items-center">
        <Image
          src={`${"https://s3.ap-south-1.amazonaws.com/vithiblog.in/webconfig/logo.png"}?id=${uuidv4()}`}
          unoptimized
          alt="logo"
          height={100}
          width={400}
          className="w-[100px] h-[94px] object-contain"
        />
        </div>
     
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">
            Blog Management
          </h1>

          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form onSubmit={formik.handleSubmit}>
              <div className="px-5 py-7">
                <label className="font-semibold text-sm text-gray-600  block">
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full"
                />

                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500 text-sm ">
                    {formik.errors.username}
                  </div>
                ) : null}
                <label className="font-semibold text-sm text-gray-600  block">
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="border rounded-lg px-3 py-2 mt-1 mb-[1px] text-sm w-full"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm ">
                    {formik.errors.password}
                  </div>
                ) : null}
                <div className="mt-5">
                  <button
                    type="submit"
                    className="transition duration-500  bg-blue-950 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                  >
                    {/* <span className="inline-block mr-2">Login</span> */}
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
                      "Login"
                    )}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg> */}
                  </button>
                </div>
              </div>
            </form>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button
                    className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                    onClick={() => router.push("/forgotpassword")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-top"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="inline-block ml-1">Forgot Password</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
export default Login;
