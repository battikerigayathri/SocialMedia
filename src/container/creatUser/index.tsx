// "use client"
// import React, { useEffect, useState } from 'react'
// import * as Yup from "yup";
// import { Field, Form, Formik, FormikProps } from "formik";
// import { ClipLoader } from 'react-spinners';
// import { useLazyQuery } from '@/hook';
// import { serverFetch } from '@/action';
// import { useRouter } from 'next/navigation';
// import toast, { Toaster } from 'react-hot-toast';
// function CreatUser() {
//     const [loading, setLoading] = useState(false)
//     const [craeteUserfun, craeteUserResponse] = useLazyQuery(serverFetch)
//     const [password, setPassword] = useState<string>('');

//     const router = useRouter()
//     const validationSchema = Yup.object().shape({
//         firstName: Yup.string().required("enter first name"),
//         lastName: Yup.string().required("enter last name"),
//         userName: Yup.string().required("enter user name"),
//         password: Yup.string()
//         .required('enter password')
//         .matches(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
//           'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
//         ),
//         role: Yup.string().required("Please select role"),
//         status: Yup.string().required("Please select status"),
//         email: Yup.string()
//             .email("Invalid email")
//             .required("Please enter your email"),

//     });
//     useEffect(() => {
//         if (craeteUserResponse?.data) {
//             console.log(craeteUserResponse?.data)
//             toast.success('successfully User created')
//             setTimeout(()=>{
//                 router.push("/admin/dashboard/users")
//             },1000)

//         }
//         if(craeteUserResponse?.error){
//             toast.error(craeteUserResponse.error.message)
//         }
//     }, [craeteUserResponse])

//     const generatePassword = (): string => {
//         const specialChars = '@$%&*';
//         const numbers = '0123456789';
//         const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//         const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';

//         const getRandomChar = (charSet: string): string => {
//           const randomIndex = Math.floor(Math.random() * charSet.length);
//           return charSet[randomIndex];
//         };

//         let password = '';

//         // Ensure at least one of each type of character
//         password += getRandomChar(specialChars);
//         password += getRandomChar(numbers);
//         password += getRandomChar(uppercaseChars);
//         password += getRandomChar(lowercaseChars);

//         // Generate remaining characters
//         const allChars = specialChars + numbers + uppercaseChars + lowercaseChars;
//         const passwordLength = 10; // Change the length as needed
//         for (let i = 0; i < passwordLength - 4; i++) {
//           password += getRandomChar(allChars);
//         }

//         // Shuffle the password
//         password = password.split('').sort(() => Math.random() - 0.5).join('');

//         return password;
//       };

//   const handleGeneratePassword = () => {
//     const newPassword = generatePassword();
//     setPassword(newPassword);
//   };
//   useEffect(()=>{
//     handleGeneratePassword()
//   },[])
//     return (
//         <div className='flex flex-col w-[calc(100vw-260px)] gap-5'>
//             {/* <div className='flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center'>
//                 <h4 className='text-center font-bold text-[20px]'>Creat user</h4>
//             </div> */}
//             <div className="shadow-md rounded-b-lg ">
//                 <div className='bg-black h-10 rounded-t-lg flex flex-col justify-center font-medium p-2 text-white'>
//                 <h4 className='font-medium text-[14px]'>Create user</h4>

//                     {/* {updateSettings?"Change your settings here":"Your settings"} */}
//                 </div>
//                 <div className='flex flex-row justify-center items-center align-middle p-3'>
//                     <Formik
//                         initialValues={{
//                             firstName: '',
//                             lastName: '',
//                             email: '',
//                             userName: '',
//                             role: 'USER',
//                             status: '',
//                             password: password

//                         }}
//                         validationSchema={validationSchema}
//                         enableReinitialize={true}
//                         onSubmit={async (values, { resetForm }) => {
//                             // console.log(values, "values")
//                             try {
//                                 setLoading(true)
//                                 craeteUserfun(`
//                         mutation CreateUser($input: UserInput!) {
//                             createUser(input: $input) {
//                               id
//                               firstName
//                               lastName
//                               userName
//                               email
//                               role
//                               status
//                               createdOn
//                               updatedOn
//                             }
//                           }
//                         `, {
//                                     "input": {
//                                         "email": values?.email,
//                                         "firstName": values?.firstName,
//                                         "lastName": values?.lastName,
//                                         "role": values?.role,
//                                         "status": values?.status,
//                                         "userName": values?.userName,
//                                         "password": values?.password
//                                     }
//                                 }, {
//                                     cache: 'no-store',
//                                 })
//                             } catch (e) {
//                                 console.log(e)
//                                 setLoading(false)

//                             }
//                             setLoading(false)

//                         }}
//                     >
//                         {(props) => (
//                             <Form>
//                                 <div className='flex flex-col item-center gap-5 justify-center '>

//                                     <div className="flex flex-row gap-y-5 gap-x-5 flex-wrap  justify-center ">

//                                             <Field name="firstName">
//                                                 {({ field, form: { touched, errors }, meta }: any) => (
//                                                     <input {...field} type="text" placeholder="First Name*" className="border-2 bg-gray-50 p-2 rounded" style={{
//                                                         border: `${meta.touched && meta.error
//                                                             ? "2px solid red"
//                                                             : "1px solid gray"
//                                                             }`,
//                                                     }} />

//                                                 )}
//                                             </Field>
//                                             <Field name="lastName">
//                                                 {({ field, form: { touched, errors }, meta }: any) => (
//                                                     <input {...field} type="text" placeholder="Last Name*" className="border-2 bg-gray-50 p-2 rounded" style={{
//                                                         border: `${meta.touched && meta.error
//                                                             ? "2px solid red"
//                                                             : "1px solid gray"
//                                                         }`,
//                                                     }} />

//                                                 )}
//                                             </Field>

//                                             <Field name="email">
//                                                 {({ field, form: { touched, errors }, meta }: any) => (

//                                                     <input {...field} type="email" placeholder="email*" className="border-2 bg-gray-50 p-2 rounded" style={{
//                                                         border: `${meta.touched && meta.error
//                                                             ? "2px solid red"
//                                                             : "1px solid gray"
//                                                             }`,
//                                                     }} />

//                                                 )}
//                                             </Field>

//                                             <Field name="userName">
//                                                 {({ field, form: { touched, errors }, meta }: any) => (
//                                                     <input {...field} type="text" placeholder="userName*" className="border-2 bg-gray-50 p-2 rounded" style={{
//                                                         border: `${meta.touched && meta.error
//                                                             ? "2px solid red"
//                                                             : "1px solid gray"
//                                                             }`,
//                                                     }} />

//                                                 )}
//                                             </Field>
//                                             <Field name="password">
//                                                 {({ field, form: { touched, errors }, meta }: any) => (
//                                                     <>
//                                                     <input {...field} type="text" placeholder="Password*" className="border-2 bg-gray-50 p-2 rounded" style={{
//                                                         border: `${meta.touched && meta.error
//                                                             ? "2px solid red"
//                                                             : "1px solid gray"
//                                                             }`,
//                                                     }} onChange={(e)=>{e.preventDefault(),setPassword(e.target.value)}}/>

//                                                                                                     {/* <div>{meta.error}</div> */}
//                                                     </>
//                                                 )}

//                                             </Field>
//                                             <Field name="role">
//                                                 {({ field, form: { touched, errors }, meta }: any) => (
//                                                     <select
//                                                         {...field}
//                                                         className="border-2 bg-gray-50 p-2 rounded"
//                                                         style={{
//                                                             border: `${meta.touched && meta.error ? "2px solid red" : "1px solid gray"
//                                                                 }`,
//                                                         }}
//                                                     >
//                                                         <option value="USER" disabled selected>
//                                                             User
//                                                         </option>
//                                                     </select>
//                                                 )}
//                                             </Field>
//                                             <Field name="status">
//                                                 {({ field, form: { touched, errors }, meta }: any) => (
//                                                     <select
//                                                         {...field}
//                                                         className="border-2 bg-gray-50 p-2 rounded"
//                                                         style={{
//                                                             border: `${meta.touched && meta.error ? "2px solid red" : "1px solid gray"
//                                                                 }`,
//                                                         }}
//                                                     >
//                                                         <option value="" disabled selected>
//                                                             Select a status
//                                                         </option>
//                                                         <option value="ACTIVE"  >
//                                                             Active
//                                                         </option>
//                                                         <option value="IN_ACTIVE" >
//                                                             In Active
//                                                         </option>
//                                                     </select>
//                                                 )}
//                                             </Field>

//                                         </div>
//                                         <div className='flex flex-row justify-center gap-5'>

//                                         <button type="submit" className=" bg-blue-950 rounded-md p-2 w-[200px] text-white font-bold text-sm h-10"> {craeteUserResponse?.loading ? (
//                                                 <div
//                                                     style={{
//                                                         display: "flex",
//                                                         justifyContent: "center",
//                                                         alignItems: "center",
//                                                     }}
//                                                 >
//                                                     <ClipLoader size={20} color="#000" />
//                                                 </div>
//                                             ) : (
//                                                 "Submit"
//                                             )}</button>
//                                             <div  className=" bg-[gray] flex flex-row justify-center rounded-md p-2 w-[200px] text-white font-bold text-sm h-10 cursor-pointer" onClick={()=>router.back()}> Cancel</div>
//                                         </div>
//                                     </div>

//                             </Form>
//                         )}
//                     </Formik>
//                 </div>
//             </div>
//             <Toaster/>
//         </div>

//     )
// }

// export default CreatUser
"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik, FormikProps } from "formik";
import { ClipLoader } from "react-spinners";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Breadcrumbs from "@/components/BreadCrumbs";

function CreatUser() {
  const [loading, setLoading] = useState(false);
  const [craeteUserfun, craeteUserResponse] = useLazyQuery(serverFetch);
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("enter first name"),
    lastName: Yup.string().required("enter last name"),
    userName: Yup.string().required("enter user name"),
    password: Yup.string()
      .required("enter password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    role: Yup.string().required("Please select role"),
    status: Yup.string().required("Please select status"),
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your email"),
  });

  useEffect(() => {
    if (craeteUserResponse?.data) {
      toast.success("User successfully created");
      setTimeout(() => {
        router.push("/admin/dashboard/users");
      }, 1000);
    }

    if (craeteUserResponse?.error) {
      toast.error(craeteUserResponse.error.message);
    }
  }, [craeteUserResponse]);

  const generatePassword = (): string => {
    const specialChars = "@$%&*";
    const numbers = "0123456789";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";

    const getRandomChar = (charSet: string): string => {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      return charSet[randomIndex];
    };

    let password = "";

    // Ensure at least one of each type of character
    password += getRandomChar(specialChars);
    password += getRandomChar(numbers);
    password += getRandomChar(uppercaseChars);
    password += getRandomChar(lowercaseChars);

    // Generate remaining characters
    const allChars = specialChars + numbers + uppercaseChars + lowercaseChars;
    const passwordLength = 10; // Change the length as needed
    for (let i = 0; i < passwordLength - 4; i++) {
      password += getRandomChar(allChars);
    }

    // Shuffle the password
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    return password;
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
  };

  useEffect(() => {
    handleGeneratePassword();
  }, []);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Users", href: "/admin/dashboard/users" },
    { label: "Create User" }, // No href for the current page
  ];
  return (
    <div className="flex flex-col w-[calc(100vw-260px)] gap-5 mt-16">
         <Breadcrumbs items={breadcrumbItems} />


      <div className="shadow-md rounded-b-lg ">
        <div className="bg-black h-10 rounded-t-lg flex flex-col justify-center font-medium p-2 text-white">
          <h4 className="font-medium text-[14px]">Create user</h4>
        </div>
        <div className="flex flex-row justify-center items-center align-middle p-3">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              userName: "",
              role: "USER",
              status: "",
              password: password,
            }}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={async (values, { resetForm }) => {
              try {
                setLoading(true);
                craeteUserfun(
                  `
                        mutation CreateUser($input: UserInput!) {
                            createUser(input: $input) {
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
                        `,
                  {
                    input: {
                      email: values?.email,
                      firstName: values?.firstName,
                      lastName: values?.lastName,
                      role: values?.role,
                      status: values?.status,
                      userName: values?.userName,
                      password: values?.password,
                    },
                  },
                  {
                    cache: "no-store",
                  }
                );
              } catch (e) {
                console.log(e);
                setLoading(false);
              }
              setLoading(false);
            }}
          >
            {(props) => (
              <Form>
              <div className="flex flex-col items-center gap-5 justify-center">
                <div className="flex flex-row gap-5 justify-center">
                  {/* Left Side Inputs */}
                  <div className="flex flex-col gap-5 w-1/2">
                    <div className="flex flex-row gap-2 items-center">
                      <label className="font-semibold text-sm w-24">First Name</label>
                      <Field name="firstName">
                        {({ field, meta }: any) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="First Name*"
                            className="border-2 bg-gray-50 p-2 rounded"
                            style={{
                              border: meta.touched && meta.error ? "2px solid red" : "1px solid gray",
                            }}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <label className="font-semibold text-sm w-24">Last Name</label>
                      <Field name="lastName">
                        {({ field, meta }: any) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Last Name*"
                            className="border-2 bg-gray-50 p-2 rounded"
                            style={{
                              border: meta.touched && meta.error ? "2px solid red" : "1px solid gray",
                            }}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <label className="font-semibold text-sm w-24">Email</label>
                      <Field name="email">
                        {({ field, meta }: any) => (
                          <input
                            {...field}
                            type="email"
                            placeholder="Email*"
                            className="border-2 bg-gray-50 p-2 rounded"
                            style={{
                              border: meta.touched && meta.error ? "2px solid red" : "1px solid gray",
                            }}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
            
                  {/* Right Side Inputs */}
                  <div className="flex flex-col gap-5 w-1/2">
                    <div className="flex flex-row gap-2 items-center">
                      <label className="font-semibold text-sm w-24">User Name</label>
                      <Field name="userName">
                        {({ field, meta }: any) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="User Name*"
                            className="border-2 bg-gray-50 p-2 rounded"
                            style={{
                              border: meta.touched && meta.error ? "2px solid red" : "1px solid gray",
                            }}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <label className="font-semibold text-sm w-24">Password</label>
                      <Field name="password">
                        {({ field, meta }: any) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Password*"
                            className="border-2 bg-gray-50 p-2 rounded"
                            style={{
                              border: meta.touched && meta.error ? "2px solid red" : "1px solid gray",
                            }}
                            value={password}
                            readOnly
                          />
                        )}
                      </Field>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <label className="font-semibold text-sm w-24">Role</label>
                      <Field name="role">
                        {({ field, meta }: any) =>
                          Array.isArray(props.initialValues.role) && props.initialValues.role.length > 0 ? (
                            <select
                              {...field}
                              className="border-2 bg-gray-50 p-2 rounded"
                              style={{
                                border: meta.touched && meta.error ? "2px solid red" : "1px solid gray",
                              }}
                            >
                              {props.initialValues.role.map((roleOption) => (
                                <option key={roleOption} value={roleOption}>
                                  {roleOption}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              {...field}
                              type="text"
                              value="User"
                              disabled
                              className="border-2 bg-gray-50 p-2 rounded"
                              style={{
                                border: meta.touched && meta.error ? "2px solid red" : "1px solid gray",
                              }}
                            />
                          )
                        }
                      </Field>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <label className="font-semibold text-sm w-24">Status</label>
                      <Field name="status">
                        {({ field, meta }: any) => (
                          <select
                            {...field}
                            className="border-2 bg-gray-50 p-2 rounded"
                            style={{
                              border: meta.touched && meta.error ? "2px solid red" : "1px solid gray",
                            }}
                          >
                            <option value="" disabled selected>
                              Select Status
                            </option>
                            <option value="ACTIVE">Active</option>
                            <option value="IN_ACTIVE">Inactive</option>
                          </select>
                        )}
                      </Field>
                    </div>
                  </div>
                </div>
            
                <div className="flex flex-row gap-5 justify-center mt-5">
                  <button
                    className="bg-black rounded-md p-2 w-[200px] text-white font-bold text-sm h-10"
                    type="submit"
                  >
                    {loading ? (
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ClipLoader size={20} color="white" />
                      </div>
                    ) : (
                      "Add"
                    )}
                  </button>
                  <button
                    className="bg-red-950 rounded-md p-2 w-[200px] text-white font-bold text-sm h-10"
                    onClick={() => router.push("/admin/dashboard/users")}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
            
            )}
          </Formik>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default CreatUser;
