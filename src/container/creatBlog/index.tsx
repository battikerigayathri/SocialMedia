"use client";
import { serverFetch } from "@/action";
import { useLazyQuery } from "@/hook";
import { Field, Form, Formik } from "formik";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import ImageSelector from "./ImageSelector";
import dynamic from "next/dynamic";
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import { useRouter } from "next/navigation";
import { compressJsonToBase64 } from "@/utils/methods";
import { DropdownMenu } from "@/components/dropdown";
interface Item {
  name: string;
  subCategory?: Item[];
  id?: string;
}

interface DropdownMenuProps {
  jsonData: Item[];
}
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
function CreatBlog() {
  const [craeteBlogfun, craeteBlogResponse] = useLazyQuery(serverFetch);
  const [getCategories, getCategoriesResponse] = useLazyQuery(serverFetch);
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const mdxEditorRef = useRef<MDXEditorMethods>(null);
  const router = useRouter();
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
  }, []);
  useEffect(() => {
    if (getCategoriesResponse.data) {
      console.log(
        getCategoriesResponse.data?.listCategorys?.docs,
        "asdfghjkuytr"
      );
    }
  }, [
    getCategoriesResponse.data,
    getCategoriesResponse.error,
    getCategoriesResponse.loading,
  ]);
  useEffect(() => {
    if (craeteBlogResponse?.data) {
      toast.success("New Blog Created successfully");
      setTimeout(() => {
        router.push("/admin/dashboard/blog");
      }, 2000);
    }
  }, [craeteBlogResponse?.data]);

  const generateDropdownOptions = (data: Item[], level: number = 0) => {
    const dashes = Array(level).fill("-").join(""); // Create dashes based on the level
    return data?.map((item) => (
      <React.Fragment key={item.id}>
        <option value={item.id}>
          {dashes} {item.name}
        </option>
        {item.subCategory &&
          generateDropdownOptions(item.subCategory, level + 1)}
      </React.Fragment>
    ));
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    metaTitle: Yup.string().required("Meta Title is required"),
    status: Yup.string().required("status is Required"),
    metaDescription: Yup.string().required("Meta Description is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.array().min(1, "Please select at least one category"),
    keywords: Yup.array()
      .min(1, "Please enter at least one keyword")
      .of(Yup.string().required()),
  });
  return (
    <div className="flex flex-col w-[calc(100vw-260px)] gap-5">
      {openSelect && (
        <ImageSelector
          setSelectedAssetId={setSelectedAssetId}
          setOpenSelect={setOpenSelect}
          selectedAssetId={selectedAssetId}
        />
      )}
      {/* <div className='flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center'>
                <h4 className='text-center font-bold text-[20px]'>Settings</h4>
            </div> */}
      <div className="shadow-md rounded-b-lg w-full">
        <div className="bg-black h-10 rounded-t-lg flex flex-col justify-center font-medium p-2 text-white">
          Creat Blog
        </div>
        <div className="flex flex-row justify-center items-center align-middle p-3 w-full">
          <Formik
            initialValues={{
              author: "",
              category: [],
              description: "",
              featured: false,
              keywords: [],
              metaDescription: "",
              metaTitle: "",
              pin: false,
              thumbnail: "",
              title: "",
              status: "",
            }}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={async (values, { resetForm }) => {
              console.log(values, "values", selectedAssetId);

              try {
                craeteBlogfun(
                  `
                                        mutation CreateBlog($input: BlogInput!) {
                                            createBlog(input: $input) {
                                            description
                                            metaDescription
                                            metaTitle
                                            thumbnail {
                                                id
                                                name
                                                mediaType
                                                type
                                                path
                                                altText
                                                description
                                            }
                                            title
                                            keywords
                                            pin
                                            status
                                            featured
                                            id
                                            category {
                                                id
                                                name
                                                status
                                                createdOn
                                                updatedOn
                                            }
                                            }
                                        }
                            `,
                  {
                    input: {
                      // "author": getCookie('token'), //later get from cookies
                      category: values?.category,
                      description: values?.description,
                      featured: values?.featured,
                      keywords: values?.keywords.filter(
                        (keyword: string) => keyword !== ""
                      ),
                      metaDescription: values?.metaDescription,
                      metaTitle: values?.metaTitle,
                      pin: values?.pin,
                      thumbnail: selectedAssetId,
                      title: values?.title,
                      status: values?.status,
                      content: compressJsonToBase64(
                        mdxEditorRef.current?.getMarkdown()
                      ),
                    },
                  },
                  {
                    cache: "no-store",
                  }
                );
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {(props) => (
              <Form>
                <div className="flex flex-col item-center gap-5 justify-center items-center">
                  <div className="flex flex-row gap-y-5 gap-x-5 flex-wrap  justify-center w-[100%]">
                    <Field name="title">
                      {({ field, form: { touched, errors }, meta }: any) => (
                        <div className="flex flex-col gap-2 ">
                          <label className="font-semibold text-sm   block w-20 ">
                            Title
                          </label>
                          <input
                            {...field}
                            type="text"
                            placeholder="Title"
                            className="border-2 bg-gray-50 p-2 rounded w-[400px]"
                            style={{
                              border: `${
                                meta.touched && meta.error
                                  ? "2px solid red"
                                  : "1px solid gray"
                              }`,
                            }}
                          />
                        </div>
                      )}
                    </Field>
                    <Field name="metaTitle">
                      {({ field, form: { touched, errors }, meta }: any) => (
                        <div className="flex flex-col gap-2">
                          <label className="font-semibold text-sm   block  w-20">
                            Meta Title
                          </label>

                          <input
                            {...field}
                            type="text"
                            placeholder="Meta title"
                            className="border-2 bg-gray-50 p-2 rounded w-[400px]"
                            style={{
                              border: `${
                                meta.touched && meta.error
                                  ? "2px solid red"
                                  : "1px solid gray"
                              }`,
                            }}
                          />
                        </div>
                      )}
                    </Field>

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
                              border: `${
                                meta.touched && meta.error
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

                    <Field name="metaDescription">
                      {({ field, form: { touched, errors }, meta }: any) => (
                        <div className="flex flex-col gap-2">
                          <label className="font-semibold text-sm   block  ">
                            Meta Description
                          </label>

                          <textarea
                            {...field}
                            cols={5}
                            placeholder="Meta description"
                            className="border-2 bg-gray-50 p-2 rounded w-[400px] "
                            style={{
                              border: `${
                                meta.touched && meta.error
                                  ? "2px solid red"
                                  : "1px solid gray"
                              }`,
                            }}
                          />
                        </div>
                      )}
                    </Field>
                    <Field name="description">
                      {({ field, form: { touched, errors }, meta }: any) => (
                        <div className="flex flex-col gap-2">
                          <label className="font-semibold text-sm   block  ">
                            Description
                          </label>

                          <textarea
                            {...field}
                            className="border-2 bg-gray-50 p-2 rounded w-[400px] "
                            placeholder="Description"
                            cols={5}
                            style={{
                              resize: "vertical",
                              border: `${
                                meta.touched && meta.error
                                  ? "2px solid red"
                                  : "1px solid gray"
                              }`,
                            }}
                          />
                        </div>
                      )}
                    </Field>

                    <Field name="category">
                      {({ field, form: { touched, errors }, meta }: any) => (
                        <div className="flex flex-col gap-2">
                          <label className="font-semibold text-sm   block  ">
                            Categories
                          </label>

                          <select
                            {...field}
                            multiple
                            size={3}
                            className="border-2 bg-gray-50 p-2 rounded w-[400px] "
                            style={{
                              border: `${
                                meta.touched && meta.error
                                  ? "2px solid red"
                                  : "1px solid gray"
                              }`,
                            }}
                          >
                            <option value="" disabled selected>
                              Select a status
                            </option>
                            {/* {getCategoriesResponse.data?.listCategorys?.docs.map((cat: any) => {
                                                            return (
                                                                <option value={cat.id}  >
                                                                    {cat.name}
                                                                </option>
                                                            )
                                                        })} */}
                            {generateDropdownOptions(
                              getCategoriesResponse.data?.listCategorys?.docs
                            )}
                          </select>
                          {/* <DropdownMenu {...field} jsonData={getCategoriesResponse.data?.listCategorys?.docs}/> */}
                        </div>
                      )}
                    </Field>
                    <div>
                      <Field name="keywords">
                        {({ field, form: { touched, errors }, meta }: any) => (
                          <div className="flex flex-col gap-2">
                            <label className="font-semibold text-sm   block  ">
                              Keywords
                            </label>

                            <textarea
                              {...field}
                              className="border-2 bg-gray-50 p-2 rounded w-[400px] h-[41.6px]"
                              placeholder="Keywords"
                              style={{
                                resize: "vertical",
                                border: `${
                                  meta.touched && meta.error
                                    ? "2px solid red"
                                    : "1px solid gray"
                                }`,
                              }}
                              onChange={(event) => {
                                const keywords = event.target.value
                                  .split(",")
                                  .map((keyword: string) => keyword.trim());
                                props.setFieldValue("keywords", keywords);
                              }}
                            />
                          </div>
                        )}
                      </Field>
                      <p className="text-[12px] ml-1">
                        Give keywords in comma seperated format(,)
                      </p>
                    </div>
                    <Field name="pin">
                      {({ field, form: { touched, errors }, meta }: any) => (
                        <div className="flex flex-col gap-2">
                          <label className="font-semibold text-sm   block  ">
                            pin
                          </label>
                          <div className="flex flex-row w-[400px] h-[41.6px]">
                            <input
                              {...field}
                              className="form-check-input me-2"
                              type="checkbox"
                              id="pin"
                              // possible={true}
                              style={{
                                border: `${
                                  meta.touched && meta.error
                                    ? "2px solid red"
                                    : "1px solid gray"
                                }`,
                                width: 13,
                                height: 12,
                                marginTop: 5,
                              }}
                            />
                            <label
                              className="form-check-label contactLabel"
                              // for="form4Example4"
                            >
                              Pin
                            </label>
                          </div>
                        </div>
                      )}
                    </Field>
                    <Field name="featured">
                      {({ field, form: { touched, errors }, meta }: any) => (
                        <div className="flex flex-col gap-2">
                          <label className="font-semibold text-sm   block  ">
                            Featured
                          </label>
                          <div className="flex flex-row w-[400px] h-[41.6px]">
                            <input
                              {...field}
                              className="form-check-input me-2"
                              type="checkbox"
                              id="featured"
                              // possible={true}
                              style={{
                                border: `${
                                  meta.touched && meta.error
                                    ? "2px solid red"
                                    : "1px solid gray"
                                }`,
                                width: 13,
                                height: 12,
                                marginTop: 5,
                              }}
                            />
                            <label
                              className="form-check-label contactLabel"
                              // for="form4Example4"
                            >
                              Featured
                            </label>
                          </div>
                        </div>
                      )}
                    </Field>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-sm   block  ">
                        Thumbnail
                      </label>
                      <div className="bg-blue-500 hover:bg-blue-700 py-1.5 px-5 rounded-lg text-white">
                        <button
                          type="button"
                          onClick={() => setOpenSelect(!openSelect)}
                        >
                          Open Image Selector
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="shadow-md">
                    <ForwardRefEditor
                      markdown={`Hello **world**!`}
                      ref={mdxEditorRef}
                      getAssetPath={getAssetPath}
                    />
                  </div>
                  <div className="flex flex-row gap-y-5 gap-x-5 flex-wrap justify-center">
                    <button
                      type="submit"
                      className=" bg-blue-950 rounded-md p-2 w-[200px] text-white font-bold text-sm h-10 "
                    >
                      {" "}
                      {craeteBlogResponse?.loading ? (
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
                      )}
                    </button>
                    <div
                      className=" bg-[gray] flex flex-row justify-center rounded-md p-2 w-[200px] text-white font-bold text-sm h-10 cursor-pointer"
                      onClick={() => router.back()}
                    >
                      {" "}
                      Cancel
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default CreatBlog;

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("../../components/MdxEditor"), {
  // Make sure we turn SSR off
  ssr: false,
});

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.

interface CustomMdxProps extends MDXEditorProps {
  getAssetPath: Function;
}
export const ForwardRefEditor = forwardRef<MDXEditorMethods, CustomMdxProps>(
  (props, ref) => (
    <Editor {...props} editorRef={ref} getAssetPath={props.getAssetPath} />
  )
);

// TS complains without the following line
ForwardRefEditor.displayName = "ForwardRefEditor";
