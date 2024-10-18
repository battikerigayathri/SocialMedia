// "use client";
// import { serverFetch } from "@/action";
// import { useLazyQuery } from "@/hook";
// import { Field, Form, Formik } from "formik";
// import React, { forwardRef, useEffect, useRef, useState } from "react";
// import { ClipLoader } from "react-spinners";
// import dynamic from "next/dynamic";
// import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
// import "@mdxeditor/editor/style.css";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { compressBase64ToJson, compressJsonToBase64 } from "@/utils/methods";
// import ImageSelector from "../creatBlog/ImageSelector";
// import toast, { Toaster } from "react-hot-toast";
// import { log } from "console";

// interface Item {
//   name: string;
//   subCategory?: Item[];
//   id?: string;
// }

// interface DropdownMenuProps {
//   jsonData: Item[];
// }
// function EditBlog() {
//   const [updateBlogfun, updateBlogResponse] = useLazyQuery(serverFetch);
//   const [getCategories, getCategoriesResponse] = useLazyQuery(serverFetch);
//   const [getblog, getblogResponse] = useLazyQuery(serverFetch);
//   const [selectedAssetId, setSelectedAssetId] = useState("");
//   const [keywordsstr, setKeywordsstr] = useState("");
//   const [categoryary, setCategoryary] = useState([]);

//   const [openSelect, setOpenSelect] = useState(false);
//   const mdxEditorRef = useRef<MDXEditorMethods>(null);
//   const router = useRouter();
//   const currentPath = useSearchParams();
//   console.log(currentPath.get("id"), " iddd");

//   async function getAssetPath(assetId: string) {
//     try {
//       const response = await serverFetch(
//         `
//                 query GetAsset($where: whereAssetInput!) {
//                     getAsset(where: $where) {
//                       path
//                       id
//                       name
//                       altText
//                     }
//                   }
//                 `,
//         {
//           where: {
//             id: {
//               is: assetId,
//             },
//           },
//         },
//         {
//           cache: "no-store",
//         }
//       );

//       mdxEditorRef.current?.insertMarkdown(
//         `![${response?.getAsset?.altText}](${response?.getAsset?.path})`
//       );
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   }
//   useEffect(() => {
//     getCategories(
//       `query ListCategorys($where: whereCategoryInput) {
//                 listCategorys(where: $where) {
//                   docs {
//                     id
//                     name
//                     status
//                     subCategory {
//                       id
//                       name
//                       status
//                       subCategory {
//                         id
//                         name
//                         status
//                         subCategory {
//                             id
//                             name
//                             status
//                             createdOn
//                             updatedOn
//                           }
//                         createdOn
//                         updatedOn
//                       }
//                       createdOn
//                       updatedOn
//                     }
//                     createdOn
//                     updatedOn
//                   }
//                 }
//               }`,
//       {
//         where: {
//           status: "ACTIVE",
//           parent: {
//             is: null,
//           },
//         },
//         limit: 100,
//       },
//       {
//         cache: "no-store",
//       }
//     );
//     getblog(
//       `query GetBlog($where: whereBlogInput!) {
//                 getBlog(where: $where) {
//                   id
//                   title
//                   status
//                   author {
//                     id
//                   }
//                   description
//                   thumbnail {
//                     path
//                     id
//                   }
//                   content
//                   metaTitle
//                   metaDescription
//                   keywords
//                   featured
//                   pin
//                   category {
//                     id
//                     name
//                   }
//                   createdOn
//                   updatedOn
//                 }
//               }`,
//       {
//         where: {
//           id: {
//             is: currentPath.get("id"),
//           },
//         },
//       },
//       {
//         cache: "no-store",
//       }
//     );
//   }, []);
//   useEffect(() => {
//     if (getCategoriesResponse.data) {
//     }
//   }, [
//     getCategoriesResponse.data,
//     getCategoriesResponse.error,
//     getCategoriesResponse.loading,
//   ]);
//   useEffect(() => {
//     if (updateBlogResponse?.data) {
//       toast.success("Blog updated");
//       setTimeout(() => {
//         router.push("/admin/dashboard/blog");
//       }, 2000);
//     } else if (updateBlogResponse?.error) {
//       console.log(updateBlogResponse?.error, "error");
//       toast.error(updateBlogResponse?.error.message);
//     }
//   }, [updateBlogResponse?.data, updateBlogResponse?.error]);
//   useEffect(() => {
//     if (getblogResponse?.data) {
//       console.log(getblogResponse.data?.getBlog?.pin, "enter");

//       setKeywordsstr(getblogResponse?.data.getBlog?.keywords.join(","));
//       setCategoryary(
//         getblogResponse?.data.getBlog?.category.map((item: any) => item.id)
//       );
//       mdxEditorRef.current?.setMarkdown(
//         compressBase64ToJson(getblogResponse?.data.getBlog?.content)
//       );
//       setSelectedAssetId(getblogResponse?.data.getBlog?.thumbnail?.id);
//     } else if (getblogResponse?.error) {
//       toast.error(getblogResponse?.error.message);
//     }
//   }, [getblogResponse?.data, getblogResponse?.loading, getblogResponse?.error]);
//   console.log(categoryary, "keywordsstrkeywordsstr");
//   console.log(getblogResponse?.data, "getblogResponse")

//   const generateDropdownOptions = (data: Item[], level: number = 0) => {
//     const dashes = Array(level).fill("-").join(""); // Create dashes based on the level
//     return data?.map((item) => (
//       <React.Fragment key={item.id}>
//         <option value={item.id}>
//           {dashes} {item.name}
//         </option>
//         {item.subCategory &&
//           generateDropdownOptions(item.subCategory, level + 1)}
//       </React.Fragment>
//     ));
//   };

//   return (
//     <div
//       className="flex flex-col w-[calc(100vw-240px)] gap-5 "
//       style={{ overflowY: "auto", overflowX: "hidden" }}
//     >
//       {openSelect && (
//         <ImageSelector
//           setSelectedAssetId={setSelectedAssetId}
//           setOpenSelect={setOpenSelect}
//           selectedAssetId={selectedAssetId}
//         />
//       )}
//       {/* <div className='flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center'>
//                 <h4 className='text-center font-bold text-[20px]'>Settings</h4>
//             </div> */}
//       <div className="shadow-md rounded-b-lg ">
//         <div className="bg-black h-10 rounded-t-lg flex flex-col justify-center font-medium p-2 text-white">
//           Update Blog
//         </div>
//         <div
//           className="flex flex-row justify-center items-center align-middle p-3  pt-10"
//           style={{ overflowY: "auto", overflowX: "hidden" }}
//         >
//           <Formik
//             initialValues={{
//               author: "",
//               category: categoryary,
//               description: getblogResponse.data?.getBlog?.description,
//               featured: getblogResponse.data?.getBlog?.featured,
//               keywords: getblogResponse.data?.getBlog?.keywords || [],
//               metaDescription: getblogResponse.data?.getBlog?.metaDescription,
//               metaTitle: getblogResponse.data?.getBlog?.metaTitle,
//               pin: getblogResponse.data?.getBlog?.pin,
//               thumbnail: "",
//               title: getblogResponse.data?.getBlog?.title,
//               status: getblogResponse.data?.getBlog?.status,
//             }}
//             // validationSchema={validationSchema}
//             enableReinitialize={true}
//             onSubmit={async (values, { resetForm }) => {
//               console.log(values, "values", selectedAssetId);

//               try {
//                 updateBlogfun(
//                   `
//                                 mutation UpdateBlog($input: updateBlogInput!) {
//                                     updateBlog(input: $input) {
//                                       id
//                                       title
//                                       status

//                                       description
//                                       thumbnail {
//                                         id
//                                         name
//                                         mediaType
//                                         type
//                                         path
//                                         altText
//                                         description
//                                         createdOn
//                                         updatedOn
//                                       }
//                                       content
//                                       metaTitle
//                                       metaDescription
//                                       keywords
//                                       featured
//                                       pin
//                                       category {
//                                         id
//                                         name
//                                         status

//                                         createdOn
//                                         updatedOn
//                                       }
//                                       createdOn
//                                       updatedOn
//                                     }
//                                   }
//                             `,
//                   {
//                     input: {
//                       // "author": getCookie('token'), //later get from cookies
//                       id: currentPath.get("id"),
//                       category: values?.category,
//                       description: values?.description,
//                       featured: values?.featured,
//                       keywords: values?.keywords.filter(
//                         (keyword: string) => keyword !== ""
//                       ),
//                       metaDescription: values?.metaDescription,
//                       metaTitle: values?.metaTitle,
//                       pin: values?.pin,
//                       thumbnail: selectedAssetId,
//                       title: values?.title,
//                       status: values?.status,
//                       content: compressJsonToBase64(
//                         mdxEditorRef.current?.getMarkdown()
//                       ),
//                     },
//                   },
//                   {
//                     cache: "no-store",
//                   }
//                 );
//               } catch (e) {
//                 console.log(e);
//               }
//             }}
//           >
//             {(props) => (
//               <Form>
//                 <div className="flex flex-col item-center gap-5 justify-start items-center">
//                   <div className="flex flex-row gap-y-5 gap-x-5 flex-wrap  justify-center w-[100%]">
//                     <Field name="title">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2 ">
//                           <label className="font-semibold text-sm block w-20 ">
//                             Title
//                           </label>
//                           <input
//                             {...field}
//                             type="text"
//                             placeholder="Title"
//                             className="border-2 bg-gray-50 p-2 rounded w-[400px]"
//                             style={{
//                               border: `${
//                                 meta.touched && meta.error
//                                   ? "2px solid red"
//                                   : "1px solid gray"
//                               }`,
//                             }}
//                           />
//                         </div>
//                       )}
//                     </Field>
//                     <Field name="metaTitle">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2">
//                           <label className="font-semibold text-sm   block  w-20">
//                             Meta Title
//                           </label>

//                           <input
//                             {...field}
//                             type="text"
//                             placeholder="Meta title"
//                             className="border-2 bg-gray-50 p-2 rounded w-[400px]"
//                             style={{
//                               border: `${
//                                 meta.touched && meta.error
//                                   ? "2px solid red"
//                                   : "1px solid gray"
//                               }`,
//                             }}
//                           />
//                         </div>
//                       )}
//                     </Field>

//                     <Field name="status">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2">
//                           <label className="font-semibold text-sm   block  ">
//                             Status
//                           </label>

//                           <select
//                             {...field}
//                             className="border-2 bg-gray-50 p-2 rounded w-[400px] h-[41.6px]"
//                             style={{
//                               border: `${
//                                 meta.touched && meta.error
//                                   ? "2px solid red"
//                                   : "1px solid gray"
//                               }`,
//                             }}
//                           >
//                             <option value="" disabled selected>
//                               Select a status
//                             </option>
//                             <option value="PUBLISH">PUBLISH</option>
//                             <option value="DRAFT">DRAFT</option>
//                             <option value="TRASH">TRASH</option>
//                           </select>
//                         </div>
//                       )}
//                     </Field>

//                     <Field name="metaDescription">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2">
//                           <label className="font-semibold text-sm   block  ">
//                             Meta Description
//                           </label>

//                           <textarea
//                             {...field}
//                             cols={5}
//                             placeholder="Meta description"
//                             className="border-2 bg-gray-50 p-2 rounded w-[400px] "
//                             style={{
//                               border: `${
//                                 meta.touched && meta.error
//                                   ? "2px solid red"
//                                   : "1px solid gray"
//                               }`,
//                             }}
//                           />
//                         </div>
//                       )}
//                     </Field>
//                     <Field name="description">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2">
//                           <label className="font-semibold text-sm   block  ">
//                             Description
//                           </label>

//                           <textarea
//                             {...field}
//                             className="border-2 bg-gray-50 p-2 rounded w-[400px] "
//                             placeholder="Description"
//                             cols={5}
//                             style={{
//                               resize: "vertical",
//                               border: `${
//                                 meta.touched && meta.error
//                                   ? "2px solid red"
//                                   : "1px solid gray"
//                               }`,
//                             }}
//                           />
//                         </div>
//                       )}
//                     </Field>

//                     <Field name="category">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2">
//                           <label className="font-semibold text-sm   block  ">
//                             Categories
//                           </label>

//                           <select
//                             {...field}
//                             multiple
//                             size={3}
//                             className="border-2 bg-gray-50 p-2 rounded w-[400px] "
//                             style={{
//                               border: `${
//                                 meta.touched && meta.error
//                                   ? "2px solid red"
//                                   : "1px solid gray"
//                               }`,
//                             }}
//                           >
//                             <option value="" disabled selected>
//                               Select a status
//                             </option>
//                             {/* {getCategoriesResponse.data?.listCategorys?.docs.map((cat: any) => {
//                                                             return (
//                                                                 <option value={cat.id}  >
//                                                                     {cat.name}
//                                                                 </option>
//                                                             )
//                                                         })} */}
//                             {generateDropdownOptions(
//                               getCategoriesResponse.data?.listCategorys?.docs
//                             )}
//                           </select>
//                         </div>
//                       )}
//                     </Field>
//                     <div>
//                       <Field name="keywords">
//                         {({ field, form: { touched, errors }, meta }: any) => (
//                           <div className="flex flex-col gap-2">
//                             <label className="font-semibold text-sm   block  ">
//                               Keywords
//                             </label>

//                             <textarea
//                               {...field}
//                               className="border-2 bg-gray-50 p-2 rounded w-[400px] h-[41.6px]"
//                               placeholder="Keywords"
//                               style={{
//                                 resize: "vertical",
//                                 border: `${
//                                   meta.touched && meta.error
//                                     ? "2px solid red"
//                                     : "1px solid gray"
//                                 }`,
//                               }}
//                               onChange={(event) => {
//                                 const keywords = event.target.value
//                                   .split(",")
//                                   .map((keyword: string) => keyword.trim());
//                                 props.setFieldValue("keywords", keywords);
//                               }}
//                             />
//                           </div>
//                         )}
//                       </Field>
//                       <p className="text-[12px] ml-1">
//                         Give keywords in comma seperated format(,)
//                       </p>
//                     </div>
//                     <Field name="pin">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2">
//                           <label className="font-semibold text-sm   block  ">
//                             Pin
//                           </label>
//                           <div className="flex flex-row w-[400px] h-[41.6px]">
//                             <input
//                               {...field}
//                               className="form-check-input me-2"
//                               type="checkbox"
//                               id="pin"
//                               // possible={true}
//                               style={{
//                                 border: `${
//                                   meta.touched && meta.error
//                                     ? "2px solid red"
//                                     : "1px solid gray"
//                                 }`,
//                                 width: 13,
//                                 height: 12,
//                                 marginTop: 5,
//                               }}
//                             />
//                             <label
//                               className="form-check-label contactLabel"
//                               // for="form4Example4"
//                             >
//                               Pin
//                             </label>
//                           </div>
//                         </div>
//                       )}
//                     </Field>
//                     <Field name="featured">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2">
//                           <label className="font-semibold text-sm   block  ">
//                             Featured
//                           </label>
//                           <div className="flex flex-row w-[400px] h-[41.6px]">
//                             <input
//                               {...field}
//                               className="form-check-input me-2"
//                               type="checkbox"
//                               id="featured"
//                               // possible={true}
//                               style={{
//                                 border: `${
//                                   meta.touched && meta.error
//                                     ? "2px solid red"
//                                     : "1px solid gray"
//                                 }`,
//                                 width: 13,
//                                 height: 12,
//                                 marginTop: 5,
//                               }}
//                             />
//                             <label
//                               className="form-check-label contactLabel"
//                               // for="form4Example4"
//                             >
//                               Featured
//                             </label>
//                           </div>
//                         </div>
//                       )}
//                     </Field>
//                     <div className="flex flex-col gap-2">
//                       <label className="font-semibold text-sm   block  ">
//                         Thumbnail
//                       </label>
//                       <div className="bg-blue-500 hover:bg-blue-700 py-1.5 px-5 rounded-lg text-white">
//                         <button
//                           type="button"
//                           onClick={() => setOpenSelect(!openSelect)}
//                         >
//                           Open Image Selector
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="shadow-md">
//                     <ForwardRefEditor
//                       markdown={`Hello **world**!`}
//                       ref={mdxEditorRef}
//                       getAssetPath={getAssetPath}
//                     />
//                   </div>
//                   <div className="flex flex-row gap-y-5 gap-x-5 flex-wrap justify-center">
//                     <button
//                       type="submit"
//                       className=" bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10 w-[200px]"
//                     >
//                       {" "}
//                       {updateBlogResponse?.loading ? (
//                         <div
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                           }}
//                         >
//                           <ClipLoader size={20} color="#000" />
//                         </div>
//                       ) : (
//                         "Update"
//                       )}
//                     </button>
//                     <div
//                       className=" bg-[gray] flex flex-row justify-center rounded-md p-2 w-[200px] text-white font-bold text-sm h-10 cursor-pointer"
//                       onClick={() => router.back()}
//                     >
//                       {" "}
//                       Cancel
//                     </div>
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//       <Toaster />
//     </div>
//   );
// }

// export default EditBlog;

// // This is the only place InitializedMDXEditor is imported directly.
// const Editor = dynamic(() => import("../../components/MdxEditor"), {
//   // Make sure we turn SSR off
//   ssr: false,
// });

// // This is what is imported by other components. Pre-initialized with plugins, and ready
// // to accept other props, including a ref.

// interface CustomMdxProps extends MDXEditorProps {
//   getAssetPath: Function;
// }
// export const ForwardRefEditor = forwardRef<MDXEditorMethods, CustomMdxProps>(
//   (props, ref) => (
//     <Editor {...props} editorRef={ref} getAssetPath={props.getAssetPath} />
//   )
// );

// // TS complains without the following line
// ForwardRefEditor.displayName = "ForwardRefEditor";




// "use client";
// import { serverFetch } from "@/action";
// import { useLazyQuery } from "@/hook";
// import { Field, Form, Formik } from "formik";
// import React, { forwardRef, useEffect, useRef, useState } from "react";
// import { ClipLoader } from "react-spinners";
// import dynamic from "next/dynamic";
// import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
// import "@mdxeditor/editor/style.css";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { compressBase64ToJson, compressJsonToBase64 } from "@/utils/methods";
// import ImageSelector from "../creatBlog/ImageSelector";
// import toast, { Toaster } from "react-hot-toast";
// import { log } from "console";

// interface Item {
//   name: string;
//   subCategory?: Item[];
//   id?: string;
// }

// interface DropdownMenuProps {
//   jsonData: Item[];
// }
// function EditBlog() {
//   const [updateBlogfun, updateBlogResponse] = useLazyQuery(serverFetch);
//   const [getCategories, getCategoriesResponse] = useLazyQuery(serverFetch);
//   const [getblog, getblogResponse] = useLazyQuery(serverFetch);
//   const [selectedAssetId, setSelectedAssetId] = useState("");
//   const [keywordsstr, setKeywordsstr] = useState("");
//   const [categoryary, setCategoryary] = useState([]);

//   const [openSelect, setOpenSelect] = useState(false);
//   const mdxEditorRef = useRef<MDXEditorMethods>(null);
//   const router = useRouter();
//   const currentPath = useSearchParams();
//   console.log(currentPath.get("id"), " iddd");

//   async function getAssetPath(assetId: string) {
//     try {
//       const response = await serverFetch(
//         `
//                 query GetAsset($where: whereAssetInput!) {
//                     getAsset(where: $where) {
//                       path
//                       id
//                       name
//                       altText
//                     }
//                   }
//                 `,
//         {
//           where: {
//             id: {
//               is: assetId,
//             },
//           },
//         },
//         {
//           cache: "no-store",
//         }
//       );

//       mdxEditorRef.current?.insertMarkdown(
//         `![${response?.getAsset?.altText}](${response?.getAsset?.path})`
//       );
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   }
//   useEffect(() => {
//     getCategories(
//       `query ListCategorys($where: whereCategoryInput) {
//                 listCategorys(where: $where) {
//                   docs {
//                     id
//                     name
//                     status
//                     subCategory {
//                       id
//                       name
//                       status
//                       subCategory {
//                         id
//                         name
//                         status
//                         subCategory {
//                             id
//                             name
//                             status
//                             createdOn
//                             updatedOn
//                           }
//                         createdOn
//                         updatedOn
//                       }
//                       createdOn
//                       updatedOn
//                     }
//                     createdOn
//                     updatedOn
//                   }
//                 }
//               }`,
//       {
//         where: {
//           status: "ACTIVE",
//           parent: {
//             is: null,
//           },
//         },
//         limit: 100,
//       },
//       {
//         cache: "no-store",
//       }
//     );
//     getblog(
//       `query GetBlog($where: whereBlogInput!) {
//                 getBlog(where: $where) {
//                   id
//                   title
//                   status
//                   author {
//                     id
//                   }
//                   description
//                   thumbnail {
//                     path
//                     id
//                   }
//                   content
//                   metaTitle
//                   metaDescription
//                   keywords
//                   featured
//                   pin
//                   category {
//                     id
//                     name
//                   }
//                   createdOn
//                   updatedOn
//                 }
//               }`,
//       {
//         where: {
//           id: {
//             is: currentPath.get("id"),
//           },
//         },
//       },
//       {
//         cache: "no-store",
//       }
//     );
//   }, []);
//   useEffect(() => {
//     if (getCategoriesResponse.data) {
//     }
//   }, [
//     getCategoriesResponse.data,
//     getCategoriesResponse.error,
//     getCategoriesResponse.loading,
//   ]);
//   useEffect(() => {
//     if (updateBlogResponse?.data) {
//       toast.success("Blog updated");
//       setTimeout(() => {
//         router.push("/admin/dashboard/blog");
//       }, 2000);
//     } else if (updateBlogResponse?.error) {
//       console.log(updateBlogResponse?.error, "error");
//       toast.error(updateBlogResponse?.error.message);
//     }
//   }, [updateBlogResponse?.data, updateBlogResponse?.error]);
//   useEffect(() => {
//     if (getblogResponse?.data) {
//       console.log(getblogResponse.data?.getBlog?.pin, "enter");

//       setKeywordsstr(getblogResponse?.data.getBlog?.keywords.join(","));
//       setCategoryary(
//         getblogResponse?.data.getBlog?.category.map((item: any) => item.id)
//       );
//       mdxEditorRef.current?.setMarkdown(
//         compressBase64ToJson(getblogResponse?.data.getBlog?.content)
//       );
//       setSelectedAssetId(getblogResponse?.data.getBlog?.thumbnail?.id);
//     } else if (getblogResponse?.error) {
//       toast.error(getblogResponse?.error.message);
//     }
//   }, [getblogResponse?.data, getblogResponse?.loading, getblogResponse?.error]);
//   console.log(categoryary, "keywordsstrkeywordsstr");
//   console.log(getblogResponse?.data, "getblogResponse")

//   const generateDropdownOptions = (data: Item[], level: number = 0) => {
//     const dashes = Array(level).fill("-").join(""); // Create dashes based on the level
//     return data?.map((item) => (
//       <React.Fragment key={item.id}>
//         <option value={item.id}>
//           {dashes} {item.name}
//         </option>
//         {item.subCategory &&
//           generateDropdownOptions(item.subCategory, level + 1)}
//       </React.Fragment>
//     ));
//   };

//   return (
//     <div
//       className="flex flex-col w-[calc(100vw-240px)] gap-5 "
//       style={{ overflowY: "auto", overflowX: "hidden" }}
//     >
//       {openSelect && (
//         <ImageSelector
//           setSelectedAssetId={setSelectedAssetId}
//           setOpenSelect={setOpenSelect}
//           selectedAssetId={selectedAssetId}
//         />
//       )}
//       {/* <div className='flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center'>
//                 <h4 className='text-center font-bold text-[20px]'>Settings</h4>
//             </div> */}
//       <div className="shadow-md rounded-b-lg ">
//         <div className="bg-black h-10 rounded-t-lg flex flex-col justify-center font-medium p-2 text-white">
//           Update Blog
//         </div>
//         <div
//           className="flex flex-row justify-center items-center align-middle p-3  pt-10"
//           style={{ overflowY: "auto", overflowX: "hidden" }}
//         >
//           <Formik
//             initialValues={{
//               author: "",
//               category: categoryary,
//               description: getblogResponse.data?.getBlog?.description,
//               featured: getblogResponse.data?.getBlog?.featured,
//               keywords: getblogResponse.data?.getBlog?.keywords || [],
//               metaDescription: getblogResponse.data?.getBlog?.metaDescription,
//               metaTitle: getblogResponse.data?.getBlog?.metaTitle,
//               pin: getblogResponse.data?.getBlog?.pin,
//               thumbnail: "",
//               title: getblogResponse.data?.getBlog?.title,
//               status: getblogResponse.data?.getBlog?.status,
//             }}
//             // validationSchema={validationSchema}
//             enableReinitialize={true}
//             onSubmit={async (values, { resetForm }) => {
//               console.log(values, "values", selectedAssetId);

//               try {
//                 updateBlogfun(
//                   `
//                                 mutation UpdateBlog($input: updateBlogInput!) {
//                                     updateBlog(input: $input) {
//                                       id
//                                       title
//                                       status

//                                       description
//                                       thumbnail {
//                                         id
//                                         name
//                                         mediaType
//                                         type
//                                         path
//                                         altText
//                                         description
//                                         createdOn
//                                         updatedOn
//                                       }
//                                       content
//                                       metaTitle
//                                       metaDescription
//                                       keywords
//                                       featured
//                                       pin
//                                       category {
//                                         id
//                                         name
//                                         status

//                                         createdOn
//                                         updatedOn
//                                       }
//                                       createdOn
//                                       updatedOn
//                                     }
//                                   }
//                             `,
//                   {
//                     input: {
//                       // "author": getCookie('token'), //later get from cookies
//                       id: currentPath.get("id"),
//                       category: values?.category,
//                       description: values?.description,
//                       featured: values?.featured,
//                       keywords: values?.keywords.filter(
//                         (keyword: string) => keyword !== ""
//                       ),
//                       metaDescription: values?.metaDescription,
//                       metaTitle: values?.metaTitle,
//                       pin: values?.pin,
//                       thumbnail: selectedAssetId,
//                       title: values?.title,
//                       status: values?.status,
//                       content: compressJsonToBase64(
//                         mdxEditorRef.current?.getMarkdown()
//                       ),
//                     },
//                   },
//                   {
//                     cache: "no-store",
//                   }
//                 );
//               } catch (e) {
//                 console.log(e);
//               }
//             }}
//           >
//             {(props) => (
//              <Form>
//              <div className="flex flex-col justify-start w-[100%]">
//              <div className="flex flex-row justify-center w-[70rem]">
//               <div className="flex flex-col justify-start w-[60%]">
//               <Field name="title">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2 ">
//                           <label className="font-semibold text-sm   block w-20 ">
//                             Title
//                           </label>
//                           <input
//                             {...field}
//                             type="text"
//                             placeholder="Title"
//                             className="border-2 bg-gray-50 p-2 rounded w-[500px]"
//                             style={{
//                               border: `${
//                                 meta.touched && meta.error
//                                   ? "2px solid red"
//                                   : "1px solid gray"
//                               }`,
//                             }}
//                           />
//                         </div>
//                       )}
//               </Field>
//               <Field name="description">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2">
//                           <label className="font-semibold text-sm   block  ">
//                             Description
//                           </label>

//                           <textarea
//                             {...field}
//                             className="border-2 bg-gray-50 p-2 rounded w-[500px] "
//                             placeholder="Description"
//                             cols={5}
//                             style={{
//                               resize: "vertical",
//                               border: `${
//                                 meta.touched && meta.error
//                                   ? "2px solid red"
//                                   : "1px solid gray"
//                               }`,
//                             }}
//                           />
//                         </div>
//                       )}
//               </Field>
//               <Field name="metaTitle">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2">
//                           <label className="font-semibold text-sm   block  w-20">
//                             Meta Title
//                           </label>

//                           <input
//                             {...field}
//                             type="text"
//                             placeholder="Meta title"
//                             className="border-2 bg-gray-50 p-2 rounded w-[500px]"
//                             style={{
//                               border: `${
//                                 meta.touched && meta.error
//                                   ? "2px solid red"
//                                   : "1px solid gray"
//                               }`,
//                             }}
//                           />
//                         </div>
//                       )}
//                </Field>
//                 <Field name="metaDescription">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2">
//                           <label className="font-semibold text-sm   block  ">
//                             Meta Description
//                           </label>

//                           <textarea
//                             {...field}
//                             cols={5}
//                             placeholder="Meta description"
//                             className="border-2 bg-gray-50 p-2 rounded w-[500px] "
//                             style={{
//                               border: `${
//                                 meta.touched && meta.error
//                                   ? "2px solid red"
//                                   : "1px solid gray"
//                               }`,
//                             }}
//                           />
//                         </div>
//                       )}
//                 </Field>
//               </div>
//               <div className="flex flex-col justify-end w-[40%]">

//              <div className="flex flex-col gap-2">
//              <Field name="featured">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2">
//                           {/* <label className="font-semibold text-sm   block  ">
//                             Featured
//                           </label> */}
//                           <div className="flex flex-row w-fit h-[41.6px]">
//                             <input
//                               {...field}
//                               className="form-check-input me-2"
//                               type="checkbox"
//                               id="featured"
//                               // possible={true}
//                               style={{
//                                 border: `${
//                                   meta.touched && meta.error
//                                     ? "2px solid red"
//                                     : "1px solid gray"
//                                 }`,
//                                 width: 13,
//                                 height: 12,
//                                 marginTop: 5,
//                               }}
//                             />
//                             <label
//                               className="form-check-label contactLabel"
//                               // for="form4Example4"
//                             >
//                               Featured
//                             </label>
//                           </div>
//                         </div>
//                       )}
//                 </Field>
//                 <Field name="pin">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2">
//                           {/* <label className="font-semibold text-sm   block  ">
//                             pin
//                           </label> */}
//                           <div className="flex flex-row w-fit h-[41.6px]">
//                             <input
//                               {...field}
//                               className="form-check-input me-2"
//                               type="checkbox"
//                               id="pin"
//                               // possible={true}
//                               style={{
//                                 border: `${
//                                   meta.touched && meta.error
//                                     ? "2px solid red"
//                                     : "1px solid gray"
//                                 }`,
//                                 width: 13,
//                                 height: 12,
//                                 marginTop: 5,
//                               }}
//                             />
//                             <label
//                               className="form-check-label contactLabel"
//                               // for="form4Example4"
//                             >
//                               Pin
//                             </label>
//                           </div>
//                         </div>
//                       )}
//                   </Field>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                       <label className="font-semibold text-sm   block  ">
//                         Thumbnail
//                       </label>
//                       <div className="bg-blue-500 hover:bg-blue-700 py-1.5 px-5 rounded-lg text-white w-[200px]">
//                         <button
//                           type="button"
//                           onClick={() => setOpenSelect(!openSelect)}
//                         >
//                           Open Image Selector
//                         </button>
//                       </div>
//                 </div>
//                 <Field name="category">
//                       {({ field, form: { touched, errors }, meta }: any) => (
//                         <div className="flex flex-col gap-2">
//                           <label className="font-semibold text-sm   block  ">
//                             Categories
//                           </label>

//                           <select
//                             {...field}
//                             multiple
//                             size={3}
//                             className="border-2 bg-gray-50 p-2 rounded w-[200px] "
//                             style={{
//                               border: `${
//                                 meta.touched && meta.error
//                                   ? "2px solid red"
//                                   : "1px solid gray"
//                               }`,
//                             }}
//                           >
//                             <option value="" disabled selected>
//                               Select a status
//                             </option>
//                             {/* {getCategoriesResponse.data?.listCategorys?.docs.map((cat: any) => {
//                                                             return (
//                                                                 <option value={cat.id}  >
//                                                                     {cat.name}
//                                                                 </option>
//                                                             )
//                                                         })} */}
//                             {generateDropdownOptions(
//                               getCategoriesResponse.data?.listCategorys?.docs
//                             )}
//                           </select>
//                           {/* <DropdownMenu {...field} jsonData={getCategoriesResponse.data?.listCategorys?.docs}/> */}
//                         </div>
//                       )}
//                   </Field>
//                   <Field name="keywords">
//                         {({ field, form: { touched, errors }, meta }: any) => (
//                           <div className="flex flex-col gap-2">
//                             <label className="font-semibold text-sm   block  ">
//                               Keywords
//                             </label>

//                             <textarea
//                               {...field}
//                               className="border-2 bg-gray-50 p-2 rounded w-[200px] h-[41.6px]"
//                               placeholder="Keywords"
//                               style={{
//                                 resize: "vertical",
//                                 border: `${
//                                   meta.touched && meta.error
//                                     ? "2px solid red"
//                                     : "1px solid gray"
//                                 }`,
//                               }}
//                               onChange={(event) => {
//                                 const keywords = event.target.value
//                                   .split(",")
//                                   .map((keyword: string) => keyword.trim());
//                                 props.setFieldValue("keywords", keywords);
//                               }}
//                             />
//                           </div>
//                         )}
//                   </Field>
//              </div>
//              </div>
//              <div className="shadow-md flex flex-row -full-screen justify-start mt-8 ">

//           <ForwardRefEditor
//             markdown={"Hello world!"}
//             className="flex flex-col justify-start w-[80vw] h-auto "
//             ref={mdxEditorRef}
//             getAssetPath={getAssetPath}
//           />
//        </div>
// <div className="flex flex-row justify-end">
// <div className="flex flex-row justify-end p-3">
//                 <button
//                       type="submit"
//                       className=" bg-blue-950 rounded-md p-2 w-[200px] text-white font-bold text-sm h-10"
//                     >
//                       {" "}
//                       {updateBlogResponse?.loading ? (
//                         <div
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                           }}
//                         >
//                           <ClipLoader size={20} color="#000" />
//                         </div>
//                       ) : (
//                         "Update"
//                       )}
//               </button>
//                 </div>
//  <div className="flex flex-row justify-end p-3">
//  <button className=" bg-gray-600 rounded-md p-2 w-[200px] text-center align-middle justify-center  text-white font-bold text-sm h-10 flex flex-row "
//                       onClick={() => router.back()}
//                     >


//                         Cancel

//               </button>
//               </div>

//                 </div>
//              </div>
//              </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//       <Toaster />
//     </div>
//   );
// }

// export default EditBlog;

// // This is the only place InitializedMDXEditor is imported directly.
// const Editor = dynamic(() => import("../../components/MdxEditor"), {
//   // Make sure we turn SSR off
//   ssr: false,
// });

// // This is what is imported by other components. Pre-initialized with plugins, and ready
// // to accept other props, including a ref.

// interface CustomMdxProps extends MDXEditorProps {
//   getAssetPath: Function;
// }
// export const ForwardRefEditor = forwardRef<MDXEditorMethods, CustomMdxProps>(
//   (props, ref) => (
//     <Editor {...props} editorRef={ref} getAssetPath={props.getAssetPath} />
//   )
// );

// // TS complains without the following line
// ForwardRefEditor.displayName = "ForwardRefEditor";


// "use client";
// import { serverFetch } from "@/action";
// import { useLazyQuery } from "@/hook";
// import { Field, Form, Formik } from "formik";
// import React, { forwardRef, useEffect, useRef, useState } from "react";
// import { ClipLoader } from "react-spinners";
// import dynamic from "next/dynamic";
// import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
// import "@mdxeditor/editor/style.css";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { compressBase64ToJson, compressJsonToBase64 } from "@/utils/methods";
// import ImageSelector from "../creatBlog/ImageSelector";
// import toast, { Toaster } from "react-hot-toast";
// import { log } from "console";

// interface Item {
//   name: string;
//   subCategory?: Item[];
//   id?: string;
// }

// interface DropdownMenuProps {
//   jsonData: Item[];
// }
// function EditBlog() {
//   const [updateBlogfun, updateBlogResponse] = useLazyQuery(serverFetch);
//   const [getCategories, getCategoriesResponse] = useLazyQuery(serverFetch);
//   const [getblog, getblogResponse] = useLazyQuery(serverFetch);
//   const [selectedAssetId, setSelectedAssetId] = useState("");
//   const [keywordsstr, setKeywordsstr] = useState("");
//   const [categoryary, setCategoryary] = useState([]);
//   const [existingImagePath, setExistingImagePath] = useState<string | null>(null); // State for existing image

//   const [openSelect, setOpenSelect] = useState(false);
//   const mdxEditorRef = useRef<MDXEditorMethods>(null);
//   const router = useRouter();
//   const currentPath = useSearchParams();
//   console.log(currentPath.get("id"), " iddd");

//   async function getAssetPath(assetId: string) {
//     try {
//       const response = await serverFetch(
//         `
//                 query GetAsset($where: whereAssetInput!) {
//                     getAsset(where: $where) {
//                       path
//                       id
//                       name
//                       altText
//                     }
//                   }
//                 `,
//         {
//           where: {
//             id: {
//               is: assetId,
//             },
//           },
//         },
//         {
//           cache: "no-store",
//         }
//       );

//       mdxEditorRef.current?.insertMarkdown(
//         `![${response?.getAsset?.altText}](${response?.getAsset?.path})`
//       );
//       setExistingImagePath(response?.getAsset?.path); // Set existing image path
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   }

//   useEffect(() => {
//     getCategories(
//       `query ListCategorys($where: whereCategoryInput) {
//                 listCategorys(where: $where) {
//                   docs {
//                     id
//                     name
//                     status
//                     subCategory {
//                       id
//                       name
//                       status
//                       subCategory {
//                         id
//                         name
//                         status
//                         subCategory {
//                             id
//                             name
//                             status
//                             createdOn
//                             updatedOn
//                           }
//                         createdOn
//                         updatedOn
//                       }
//                       createdOn
//                       updatedOn
//                     }
//                     createdOn
//                     updatedOn
//                   }
//                 }
//               }`,
//       {
//         where: {
//           status: "ACTIVE",
//           parent: {
//             is: null,
//           },
//         },
//         limit: 100,
//       },
//       {
//         cache: "no-store",
//       }
//     );
//     getblog(
//       `query GetBlog($where: whereBlogInput!) {
//                 getBlog(where: $where) {
//                   id
//                   title
//                   status
//                   author {
//                     id
//                   }
//                   description
//                   thumbnail {
//                     path
//                     id
//                   }
//                   content
//                   metaTitle
//                   metaDescription
//                   keywords
//                   featured
//                   pin
//                   category {
//                     id
//                     name
//                   }
//                   createdOn
//                   updatedOn
//                 }
//               }`,
//       {
//         where: {
//           id: {
//             is: currentPath.get("id"),
//           },
//         },
//       },
//       {
//         cache: "no-store",
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (getCategoriesResponse.data) {
//     }
//   }, [
//     getCategoriesResponse.data,
//     getCategoriesResponse.error,
//     getCategoriesResponse.loading,
//   ]);

//   useEffect(() => {
//     if (updateBlogResponse?.data) {
//       toast.success("Blog updated");
//       setTimeout(() => {
//         router.push("/admin/dashboard/blog");
//       }, 2000);
//     } else if (updateBlogResponse?.error) {
//       console.log(updateBlogResponse?.error, "error");
//       toast.error(updateBlogResponse?.error.message);
//     }
//   }, [updateBlogResponse?.data, updateBlogResponse?.error]);

//   useEffect(() => {
//     if (getblogResponse?.data) {
//       console.log(getblogResponse.data?.getBlog?.pin, "enter");

//       setKeywordsstr(getblogResponse?.data.getBlog?.keywords.join(","));
//       setCategoryary(
//         getblogResponse?.data.getBlog?.category.map((item: any) => item.id)
//       );
//       mdxEditorRef.current?.setMarkdown(
//         compressBase64ToJson(getblogResponse?.data.getBlog?.content)
//       );
//       setSelectedAssetId(getblogResponse?.data.getBlog?.thumbnail?.id);
//       setExistingImagePath(getblogResponse?.data.getBlog?.thumbnail?.path
//       ); // Set existing image path
//     } else if (getblogResponse?.error) {
//       toast.error(getblogResponse?.error.message);
//     }
//   }, [getblogResponse?.data, getblogResponse?.loading, getblogResponse?.error]);

//   console.log(categoryary, "keywordsstrkeywordsstr");
//   console.log(getblogResponse?.data, "getblogResponse")

//   const generateDropdownOptions = (data: Item[], level: number = 0) => {
//     const dashes = Array(level).fill("-").join(""); // Create dashes based on the level
//     return data?.map((item) => (
//       <React.Fragment key={item.id}>
//         <option value={item.id}>
//           {dashes} {item.name}
//         </option>
//         {item.subCategory &&
//           generateDropdownOptions(item.subCategory, level + 1)}
//       </React.Fragment>
//     ));
//   };

//   return (
//     <div
//       className="flex flex-col w-[calc(100vw-240px)] gap-5 "
//       style={{ overflowY: "auto", overflowX: "hidden" }}
//     >
//       {openSelect && (
//         <ImageSelector
//           setSelectedAssetId={setSelectedAssetId}
//           setOpenSelect={setOpenSelect}
//           selectedAssetId={selectedAssetId}
//         />
//       )}
//       <div className="shadow-md rounded-b-lg ">
//         <div className="bg-black h-10 rounded-t-lg flex flex-col justify-center font-medium p-2 text-white">
//           Update Blog
//         </div>
//         <div
//           className="flex flex-row justify-center items-center align-middle p-3  pt-10"
//           style={{ overflowY: "auto", overflowX: "hidden" }}
//         >
//          <Formik
//   initialValues={{
//     author: "",
//     category: categoryary,
//     description: getblogResponse.data?.getBlog?.description,
//     featured: getblogResponse.data?.getBlog?.featured,
//     keywords: getblogResponse.data?.getBlog?.keywords || [],
//     metaDescription: getblogResponse.data?.getBlog?.metaDescription,
//     metaTitle: getblogResponse.data?.getBlog?.metaTitle,
//     pin: getblogResponse.data?.getBlog?.pin,
//     thumbnail: "",  // Ensure this matches the initial state type
//     title: getblogResponse.data?.getBlog?.title,
//     status: getblogResponse.data?.getBlog?.status,
//   }}
//   enableReinitialize={true}
//   onSubmit={async (values, { resetForm }) => {
//     console.log(values, "values", selectedAssetId);
//     console.log("Selected Asset ID:", selectedAssetId);

//     try {
//       updateBlogfun(
//         `
//         mutation UpdateBlog($input: updateBlogInput!) {
//           updateBlog(input: $input) {
//             id
//             title
//             status
//             description
//             thumbnail {
//               id
//               name
//               mediaType
//               type
//               path
//               altText
//               description
//               createdOn
//               updatedOn
//             }
//             content
//             metaTitle
//             metaDescription
//             keywords
//             featured
//             pin
//             category {
//               id
//               name
//               status
//               createdOn
//               updatedOn
//             }
//             createdOn
//             updatedOn
//           }
//         }
//       `,
//         {
//           input: {
//             id: currentPath.get("id"),
//             category: values?.category,
//             description: values?.description,
//             featured: values?.featured,
//             keywords: values?.keywords.filter(
//               (keyword: string) => keyword !== ""
//             ),
//             metaDescription: values?.metaDescription,
//             metaTitle: values?.metaTitle,
//             pin: values?.pin,
//             title: values?.title,
//             status: values?.status,
//             thumbnail: selectedAssetId, // Use only the ID here
//             content: compressJsonToBase64(
//               mdxEditorRef.current?.getMarkdown()
//             ),
//           },
//         }
//       );
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   }}
// >

//             {({ values, handleChange, setFieldValue, handleSubmit }) => (
//               <Form onSubmit={handleSubmit} className="w-full">
//           <div className="flex flex-row gap-20 w-[100%]" >
//                   <div className="flex flex-col justify-start w-[50%]">
//                   <div className=" flex flex-col gap-2">
//                     <label
//                       htmlFor="title"
//                       className="font-semibold text-sm text-[#0a3d62]"
//                     >
//                       Title 
//                     </label>
//                     <Field
//                       type="text"
//                       id="title"
//                       name="title"
//                       className="px-4 py-2 border border-gray-300 rounded"
//                     />
//                   </div>
//                   <div className=" flex flex-col gap-2 w-[100%]">
//                     <label
//                       htmlFor="description"
//                       className="font-semibold text-sm text-[#0a3d62]"
//                     >
//                       Description
//                     </label>
//                     <Field
//                       as="textarea"
//                       id="description"
//                       name="description"
//                       rows="4"
//                       className="px-4 py-2 border border-gray-300 rounded"
//                     />
//                   </div>
//                   <div className=" flex flex-col gap-2 w-[100%]">
//                     <label
//                       htmlFor="metaTitle"
//                       className="font-semibold text-sm text-[#0a3d62]"
//                     >
//                       Meta Title
//                     </label>
//                     <Field
//                       type="text"
//                       id="metaTitle"
//                       name="metaTitle"
//                       className="px-4 py-2 border border-gray-300 rounded"
//                     />
//                   </div>
//                   <div className=" flex flex-col gap-2 w-[100%]">
//                     <label
//                       htmlFor="metaDescription"
//                       className="font-semibold text-sm text-[#0a3d62]"
//                     >
//                       Meta Description
//                     </label>
//                     <Field
//                       type="text"
//                       id="metaDescription"
//                       name="metaDescription"
//                       className="px-4 py-2 border border-gray-300 rounded"
//                     />
//                   </div>
//             </div>

//                   <div className="flex flex-col gap-3">
//                     {/* Featured and Pin */}
//                     <div className="flex flex-col w-full gap-4 pt-2">
//                       <div className="flex items-center gap-2">
//                         <Field
//                           type="checkbox"
//                           name="featured"
//                           className="h-5 w-5"
//                           onChange={(e: any) => {
//                             setFieldValue("featured", e.target.checked);
//                           }}
//                           checked={values.featured}
//                         />
//                         <label htmlFor="featured">Featured</label>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Field
//                           type="checkbox"
//                           name="pin"
//                           className="h-5 w-5"
//                           onChange={(e: any) => {
//                             setFieldValue("pin", e.target.checked);
//                           }}
//                           checked={values.pin}
//                         />
//                         <label htmlFor="pin">Pin</label>
//                       </div>
//                     </div>
//                     {/* Thumbnail */}
//                     <div className="w-full flex flex-col gap-2">
//                     <label
//                       htmlFor="thumbnail"
//                       className="font-semibold text-sm text-[#0a3d62]"
//                     >
//                       Thumbnail
//                     </label>
//                     <div className="flex items-center gap-2">
//                       {existingImagePath && (
//                         <img
//                           src={existingImagePath}
//                           alt="Thumbnail"
//                           className="w-16 h-16 object-cover border border-gray-300 rounded"
//                         />
//                       )}
//                       <button
//                         type="button"
//                         onClick={() => setOpenSelect(true)}
//                         className="bg-blue-500 text-white px-4 py-2 rounded"
//                       >
//                         Open Image Selector
//                       </button>
//                     </div>
//                   </div>
//                     {/* Categories */}
//                     <div className="flex flex-col gap-1 ">
//                       <label htmlFor="category">Category</label>
//                       <Field
//                         as="select"
//                         name="category"
//                         multiple
//                         className="p-2 border border-gray-300 rounded w-[100%]"
//                         onChange={(e: any) => {
//                           const selectedOptions = Array.from(
//                             e.target.selectedOptions
//                           ).map((option: any) => option.value);
//                           setFieldValue("category", selectedOptions);
//                         }}
//                         value={values.category}
//                       >
//                         {getCategoriesResponse?.data?.listCategorys?.docs &&
//                           generateDropdownOptions(
//                             getCategoriesResponse?.data?.listCategorys?.docs
//                           )}
//                       </Field>
//                     </div>
//                     {/* Keywords */}
//                     <div className="flex flex-col gap-1 w-full">
//                       <label htmlFor="keywords">Keywords</label>
//                       <Field
//                         name="keywords"
//                         className="p-2 border border-gray-300 rounded"
//                         placeholder="Enter keywords, separated by commas"
//                         onChange={(e: any) => {
//                           const keywords = e.target.value
//                             .split(",")
//                             .map((keyword: string) => keyword.trim());
//                           setFieldValue("keywords", keywords);
//                           setKeywordsstr(e.target.value);
//                         }}
//                         value={keywordsstr}
//                       />
//                     </div>

//                 </div>

//                 </div>
//             <div className="shadow-md flex flex-col justify-start mt-[50px] w-screen">
//   <ForwardRefEditor
//   markdown={"Hello world!"}
//   className="flex flex-col w-[200%]"
//   ref={mdxEditorRef}
//   getAssetPath={getAssetPath}
// />
// </div>

// <div className="flex flex-row justify-end mt-4 gap-3">
//                     <button
//                       type="submit"
//                       className="bg-blue-500 text-white px-10 py-2 rounded"
//                     >
//                       Update
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => router.push("/admin/dashboard/blog")}
//                       className="bg-gray-500 text-white px-10 py-2 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//       <Toaster />
//     </div>
//   );
// }

// export default EditBlog;

// // This is the only place InitializedMDXEditor is imported directly.
// const Editor = dynamic(() => import("../../components/MdxEditor"), {
//   // Make sure we turn SSR off
//   ssr: false,
// });

// // This is what is imported by other components. Pre-initialized with plugins, and ready
// // to accept other props, including a ref.

// interface CustomMdxProps extends MDXEditorProps {
//   getAssetPath: Function;
// }
// export const ForwardRefEditor = forwardRef<MDXEditorMethods, CustomMdxProps>(
//   (props, ref) => (
//     <Editor {...props} editorRef={ref} getAssetPath={props.getAssetPath} />
//   )
// );

// // TS complains without the following line
// ForwardRefEditor.displayName = "ForwardRefEditor";


"use client";
import { serverFetch } from "@/action";
import { useLazyQuery } from "@/hook";
import { Field, Form, Formik } from "formik";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import dynamic from "next/dynamic";
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { compressBase64ToJson, compressJsonToBase64 } from "@/utils/methods";
import ImageSelector from "../creatBlog/ImageSelector";
import toast, { Toaster } from "react-hot-toast";
import SuccessModal from "@/components/modal/SuccessfullModal";

interface Item {
  name: string;
  subCategory?: Item[];
  id?: string;
}

interface DropdownMenuProps {
  jsonData: Item[];
}

function EditBlog() {
  const [updateBlogfun, updateBlogResponse] = useLazyQuery(serverFetch);
  const [getCategories, getCategoriesResponse] = useLazyQuery(serverFetch);
  const [getblog, getblogResponse] = useLazyQuery(serverFetch);
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [keywordsstr, setKeywordsstr] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryary, setCategoryary] = useState([]);
  const [existingImagePath, setExistingImagePath] = useState<string | null>(null); // State for existing image
  const [openSelect, setOpenSelect] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  
  const mdxEditorRef = useRef<MDXEditorMethods>(null);
  const router = useRouter();
  const currentPath = useSearchParams();

  async function getAssetPath(assetId: string) {
    try {
      const response = await serverFetch(
        `
          query GetAsset($where: whereAssetInput!) {
            getAsset(where: $where) {
              path
              id
              name
              altText
            }
          }
        `,
        {
          where: {
            id: {
              is: assetId,
            },
          },
        },
        {
          cache: "no-store",
        }
      );

      mdxEditorRef.current?.insertMarkdown(
        `![${response?.getAsset?.altText}](${response?.getAsset?.path})`
      );
      setExistingImagePath(response?.getAsset?.path); // Set existing image path
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getCategories(
      `query ListCategorys($where: whereCategoryInput) {
          listCategorys(where: $where) {
            docs {
              id
              name
              status
              subCategory {
                id
                name
                status
                subCategory {
                  id
                  name
                  status
                  subCategory {
                    id
                    name
                    status
                    createdOn
                    updatedOn
                  }
                  createdOn
                  updatedOn
                }
                createdOn
                updatedOn
              }
              createdOn
              updatedOn
            }
          }
        }`,
      {
        where: {
          status: "ACTIVE",
          parent: {
            is: null,
          },
        },
        limit: 100,
      },
      {
        cache: "no-store",
      }
    );
    getblog(
      `query GetBlog($where: whereBlogInput!) {
          getBlog(where: $where) {
            id
            title
            status
            author {
              id
            }
            description
            thumbnail {
              path
              id
            }
            content
            metaTitle
            metaDescription
            keywords
            featured
            pin
            category {
              id
              name
            }
            createdOn
            updatedOn
          }
        }`,
      {
        where: {
          id: {
            is: currentPath.get("id"),
          },
        },
      },
      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    if (getCategoriesResponse.data) {
      // Handle categories data
    }
  }, [getCategoriesResponse.data, getCategoriesResponse.error, getCategoriesResponse.loading]);

  useEffect(() => {
    if (updateBlogResponse?.data) {
      setIsSuccessModalOpen(true);
      // toast.success("Blog updated");
      setTimeout(() => {
        router.push("/admin/dashboard/blog");
      }, 2000);
    } else if (updateBlogResponse?.error) {
      console.log(updateBlogResponse?.error, "error");
      toast.error(updateBlogResponse?.error.message);
    }
    setLoading(false); 
  }, [updateBlogResponse?.data, updateBlogResponse?.error]);

  useEffect(() => {
    if (getblogResponse?.data) {
      setKeywordsstr(getblogResponse?.data.getBlog?.keywords.join(","));
      setCategoryary(getblogResponse?.data.getBlog?.category.map((item: any) => item.id));
      mdxEditorRef.current?.setMarkdown(compressBase64ToJson(getblogResponse?.data.getBlog?.content));
      setSelectedAssetId(getblogResponse?.data.getBlog?.thumbnail?.id);
      setExistingImagePath(getblogResponse?.data.getBlog?.thumbnail?.path); // Set existing image path
    } else if (getblogResponse?.error) {
      toast.error(getblogResponse?.error.message);
    }
  }, [getblogResponse?.data, getblogResponse?.loading, getblogResponse?.error]);
  console.log(categoryary, "keywordsstrkeywordsstr");
  console.log(getblogResponse?.data, "getblogResponse")

  const generateDropdownOptions = (data: Item[], level: number = 0) => {
    const dashes = Array(level).fill("-").join(""); // Create dashes based on the level
    return data?.map((item) => (
      <React.Fragment key={item.id}>
        <option value={item.id}>
          {dashes} {item.name}
        </option>
        {item.subCategory && generateDropdownOptions(item.subCategory, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className="flex flex-col w-[calc(100vw-230px)] gap-5 shadow mt-16" style={{ overflowY: "auto", overflowX: "hidden" }}>
      {openSelect && (
        <ImageSelector
          setSelectedAssetId={(id) => {
            setSelectedAssetId(id);
            getAssetPath(id); // Fetch the new image path when an image is selected
          }}
          setOpenSelect={setOpenSelect}
          selectedAssetId={selectedAssetId}
        />
      )}
      <div className="shadow-md rounded-b-lg">
        <div className="bg-black h-10 rounded-t-lg flex flex-col justify-center font-medium p-2 text-white">
          Update Blog
        </div>
        <div className="flex flex-row justify-center items-center align-middle p-3 pt-10 " style={{ overflowY: "auto", overflowX: "hidden" }}>
          <Formik
            initialValues={{
              author: "",
              category: getblogResponse.data?.getBlog?.category?.name,
              description: getblogResponse.data?.getBlog?.description,
              featured: getblogResponse.data?.getBlog?.featured,
              keywords: getblogResponse.data?.getBlog?.keywords || [],
              metaDescription: getblogResponse.data?.getBlog?.metaDescription,
              metaTitle: getblogResponse.data?.getBlog?.metaTitle,
              pin: getblogResponse.data?.getBlog?.pin,
              thumbnail: "", // Ensure this matches the initial state type
              title: getblogResponse.data?.getBlog?.title,
              status: getblogResponse.data?.getBlog?.status,
            }}
            enableReinitialize={true}
            onSubmit={async (values, { resetForm }) => {
              setLoading(true);
              console.log(values, "values", selectedAssetId);
              console.log("Selected Asset ID:", selectedAssetId);

              try {
                updateBlogfun(
                  `
                    mutation UpdateBlog($input: updateBlogInput!) {
                      updateBlog(input: $input) {
                        id
                        title
                        status
                        description
                        thumbnail {
                          id
                          name
                          mediaType
                          type
                          path
                          altText
                          description
                          createdOn
                          updatedOn
                        }
                        content
                        metaTitle
                        metaDescription
                        keywords
                        featured
                        pin
                        category {
                          id
                          name
                          status
                          createdOn
                          updatedOn
                        }
                        createdOn
                        updatedOn
                      }
                    }
                  `,
                  {
                    input: {
                      id: currentPath.get("id"),
                      category: values?.category,
                      description: values?.description,
                      featured: values?.featured,
                      keywords: values?.keywords.filter(
                        (keyword: string) => keyword !== ""
                      ),
                      metaDescription: values?.metaDescription,
                      metaTitle: values?.metaTitle,
                      pin: values?.pin,
                      title: values?.title,
                      status: values?.status,
                      thumbnail: selectedAssetId, // Use only the ID here
                      content: compressJsonToBase64(
                        mdxEditorRef.current?.getMarkdown()
                      ),
                    },
                  }
                );
              } catch (error: any) {
                console.log(error.message);
              } finally {
                setLoading(false); // Stop loader in case of error
              }

            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="w-full gap-3 ">
                <div className="flex flex-row justify-start w-[100%] gap-36">
                  <div className="flex flex-col w-[50%]">
                    <div className="relative flex flex-col gap-2 ">
                      <label className="block text-sm font-bold leading-6 text-gray-900 ">
                        Title:
                      </label>
                      <Field
                        name="title"
                        placeholder="Title"
                        type="text"
                        className="block rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 mb-2"
                      />
                    </div>
                    <div className="relative flex flex-col gap-2">
                      <label className="text-sm font-bold mt-2">Description:</label>
                      <Field
                        name="description"
                        component="textarea"
                        rows="3"
                        className="mb-3 p-2 border border-gray-300 rounded resize-none"
                        placeholder="Enter the description"
                      />
                    </div>
                    <div className="relative flex flex-col gap-2">
                      <label className="block text-sm font-bold leading-6 text-gray-900 ">
                        Meta Title:
                      </label>
                      <Field
                        name="metaTitle"
                        placeholder="Meta Title"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="relative flex flex-col gap-2">
                      <label className="block text-sm font-bold leading-6 text-gray-900 mt-2">
                        Meta Description:
                      </label>
                      <Field
                        name="metaDescription"
                        component="textarea"
                        rows="3"
                        className="p-2 border border-gray-300 rounded resize-none"
                        placeholder="Enter the meta description"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row w-[40%]">
                    <div className="relative flex flex-row gap-2 w-[50%]">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col w-full gap-4 pt-2">
                          <div className="flex items-center gap-2">
                            <Field name="status">
                              {({ field, form: { touched, errors }, meta }: any) => (
                                <div className="flex flex-col gap-2">
                                  <label className="font-semibold text-sm   block  ">
                                    Status
                                  </label>

                                  <select
                                    {...field}
                                    className="border-2 bg-gray-50 p-2 rounded w-[400px] h-[41.6px]"
                                    style={{
                                      border: `${meta.touched && meta.error
                                          ? "2px solid red"
                                          : "1px solid gray"
                                        }`,
                                    }}
                                  >
                                    <option value="" disabled selected>
                                      Select a status
                                    </option>
                                    <option value="PUBLISH">PUBLISH</option>
                                    <option value="DRAFT">DRAFT</option>    
                                    <option value="TRASH">TRASH</option>
                                  </select>
                                </div>
                              )}
                            </Field>
                            </div>
                            <div className="flex items-center gap-2">
                            <Field
                              type="checkbox"
                              name="featured"
                              className="h-5 w-5"
                              onChange={(e: any) => setFieldValue("featured", e.target.checked)}
                              checked={values.featured}
                            />
                            <label htmlFor="featured">Featured</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Field
                              type="checkbox"
                              name="pin"
                              className="h-5 w-5"
                              onChange={(e: any) => setFieldValue("pin", e.target.checked)}
                              checked={values.pin}
                            />
                            <label htmlFor="pin">Pin</label>
                          </div>
                        </div>
                        <div className="relative flex flex-col gap-2">
                          <label className="block text-sm font-bold leading-6 text-gray-900">
                            Thumbnail:
                          </label>
                          <div className="flex items-center gap-2">
                            {existingImagePath ? (
                              <img
                                src={existingImagePath}
                                alt="Thumbnail"
                                className="h-20 w-20 object-cover"
                              />
                            ) : (
                              <div className="h-20 w-20 bg-gray-200 flex items-center justify-center">
                                No Image
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => setOpenSelect(true)}
                              className="bg-blue-500 text-white px-2 py-2 rounded-md "
                            >
                              Change Image
                            </button>
                          </div>
                        </div>
                        <div className="relative flex flex-col gap-2">
                          <label className="block text-sm font-bold leading-6 text-gray-900">
                            Category:
                          </label>
                          <Field
                            as="select"
                            name="category"
                            multiple={true}
                            className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          >
                            {categoryary.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="relative flex flex-col gap-2">
                          <label className="block text-sm font-bold leading-6 text-gray-900">
                            Keywords:
                          </label>
                          <Field
                            name="keywords"
                            placeholder="Keywords"
                            type="text"
                            value={keywordsstr}
                            onChange={(e) => setKeywordsstr(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />
                        </div>



                      </div>
                    </div>
                  </div>

                </div>
                <div className="flex flex-col">
                  <div className="relative flex flex-col gap-2 col-span-2">
                    <label className="block text-sm font-bold leading-6 text-gray-900">
                      Content
                    </label>
                    <ForwardRefEditor
                      markdown={"Hello world!"}
                      className="flex flex-col justify-start w-[80vw] h-auto shadow "
                      ref={mdxEditorRef}
                      getAssetPath={getAssetPath}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button
                    type="submit"
                    className="bg-green-500 text-white px-3 py-2 rounded-md text-sm"
                  >
                    Update
                  </button>
                
                   <button className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm"
                      onClick={() => router.back()}>
                      Cancel
                   </button>
                
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Toaster />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
}

export default EditBlog;

// // This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("../../components/MdxEditor"), {
  //   // Make sure we turn SSR off
  ssr: false,
});

// // This is what is imported by other components. Pre-initialized with plugins, and ready
// // to accept other props, including a ref.

interface CustomMdxProps extends MDXEditorProps {
  getAssetPath: Function;
}
export const ForwardRefEditor = forwardRef<MDXEditorMethods, CustomMdxProps>(
  (props, ref) => (
    <Editor {...props} editorRef={ref} getAssetPath={props.getAssetPath} />
  )
);

// // TS complains without the following line
ForwardRefEditor.displayName = "ForwardRefEditor";
