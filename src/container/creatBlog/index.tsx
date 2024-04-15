"use client"
import { serverFetch } from '@/action'
import { useLazyQuery } from '@/hook'
import { Field, Form, Formik } from 'formik'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import ImageSelector from './ImageSelector'
import dynamic from 'next/dynamic'
import { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

function CreatBlog() {
    const [craeteBlogfun, craeteBlogResponse] = useLazyQuery(serverFetch)
    const [keywordstr, setKeywordstr] = useState('')
    const [getCategories, getCategoriesResponse] = useLazyQuery(serverFetch);
    const [selectedAssetId, setSelectedAssetId] = useState('');
    const [openSelect, setOpenSelect] = useState(false);
    const mdxEditorRef = useRef<MDXEditorMethods>(null);
    useEffect(() => {
        if (keywordstr) {
            // keywordstr.split(,)
        }
    }, [keywordstr])

    useEffect(() => {
        getCategories(
            `query ListCategorys($where: whereCategoryInput, $limit: Int!) {
                listCategorys(where: $where, limit: $limit) {
                  docs {
                    id
                    name
                    status
                  }
                  limit
                }
              }`,
            {
                "where": {
                    "status": "ACTIVE"
                },
                "limit": 100
            },
            {
                cache: "no-store"
            }
        )
    }, [])
    useEffect(() => {
        if (getCategoriesResponse.data) {

        }
    }, [getCategoriesResponse.data, getCategoriesResponse.error, getCategoriesResponse.loading])
    return (
        <div className='flex flex-col w-[calc(100vw-260px)] gap-5'>
            {
                openSelect &&
                <ImageSelector setSelectedAssetId={setSelectedAssetId} setOpenSelect={setOpenSelect} />
            }
            {/* <div className='flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center'>
                <h4 className='text-center font-bold text-[20px]'>Settings</h4>
            </div> */}
            <div className="shadow-md rounded-b-lg ">
                <div className='bg-black h-10 rounded-t-lg flex flex-col justify-center font-medium p-2 text-white'>
                    Creat Blog
                </div>
                <div className='flex flex-row justify-center items-center align-middle p-3'>
                    <Formik
                        initialValues={{
                            author: '', category: [], description: '', featured: false, keywords: [], metaDescription: '', metaTitle: '', pin: false, thumbnail: '', title: '', status: '',
                        }}
                        // validationSchema={validationSchema}
                        enableReinitialize={true}
                        onSubmit={async (values, { resetForm }) => {
                            console.log(values, "values", selectedAssetId)
                            try {
                                craeteBlogfun(`
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
                            `, {
                                    "input": {
                                        // "author": getCookie('token'), //later get from cookies
                                        "category": values?.category,
                                        "description": values?.description,
                                        "featured": values?.featured,
                                        "keywords": values?.keywords.filter((keyword: string) => keyword !== ""),
                                        "metaDescription": values?.metaDescription,
                                        "metaTitle": values?.metaTitle,
                                        "pin": values?.pin,
                                        "thumbnail": selectedAssetId,
                                        "title": values?.title,
                                        "status": values?.status
                                    }
                                }, {
                                    cache: 'no-store',
                                })
                            } catch (e) {
                                console.log(e)

                            }

                        }}
                    >
                        {(props) => (
                            <Form>
                                <div className='flex flex-col item-center gap-5 justify-center items-center'>

                                    <div className="flex flex-row gap-y-5 gap-x-5 flex-wrap  justify-center ">
                                        <Field name="title">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2 '>
                                                    <label className="font-semibold text-sm   block w-20 ">Title</label>
                                                    <input {...field} type="text" placeholder="Title" className="border-2 bg-gray-50 p-2 rounded w-[400px]" style={{
                                                        border: `${meta.touched && meta.error
                                                            ? "2px solid red"
                                                            : "1px solid gray"
                                                            }`,
                                                    }} />
                                                </div>

                                            )}
                                        </Field>
                                        <Field name="metaTitle">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  w-20">Meta Title</label>

                                                    <input {...field} type="text" placeholder="Meta title" className="border-2 bg-gray-50 p-2 rounded w-[400px]" style={{
                                                        border: `${meta.touched && meta.error
                                                            ? "2px solid red"
                                                            : "1px solid gray"
                                                            }`,
                                                    }} />
                                                </div>

                                            )}
                                        </Field>

                                        <Field name="status">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  ">Status</label>

                                                    <select
                                                        {...field}
                                                        className="border-2 bg-gray-50 p-2 rounded w-[400px] h-[41.6px]"
                                                        style={{
                                                            border: `${meta.touched && meta.error ? "2px solid red" : "1px solid gray"
                                                                }`,
                                                        }}
                                                    >
                                                        <option value="" disabled selected>
                                                            Select a status
                                                        </option>
                                                        <option value="PUBLISH"  >
                                                            PUBLISH
                                                        </option>
                                                        <option value="DRAFT" >
                                                            DRAFT
                                                        </option>
                                                        <option value="TRASH" >
                                                            TRASH
                                                        </option>
                                                    </select>
                                                </div>
                                            )}
                                        </Field>

                                        <Field name="metaDescription">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  ">Meta Description</label>

                                                    <textarea {...field} cols={5} placeholder="Meta description" className="border-2 bg-gray-50 p-2 rounded w-[400px] " style={{
                                                        border: `${meta.touched && meta.error
                                                            ? "2px solid red"
                                                            : "1px solid gray"
                                                            }`,
                                                    }} />

                                                </div>

                                            )}
                                        </Field>
                                        <Field name="description">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  ">Description</label>

                                                    <textarea {...field} className="border-2 bg-gray-50 p-2 rounded w-[400px] "
                                                        placeholder="Description"
                                                        cols={5}
                                                        style={{
                                                            resize: 'vertical',
                                                            border: `${meta.touched && meta.error
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
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  ">Categories</label>

                                                    <select
                                                        {...field}
                                                        multiple
                                                        size={3}
                                                        className="border-2 bg-gray-50 p-2 rounded w-[400px] "
                                                        style={{
                                                            border: `${meta.touched && meta.error ? "2px solid red" : "1px solid gray"
                                                                }`,
                                                        }}
                                                    >
                                                        <option value="" disabled selected>
                                                            Select a status
                                                        </option>
                                                        {getCategoriesResponse.data?.listCategorys?.docs.map((cat: any) => {
                                                            return (
                                                                <option value={cat.id}  >
                                                                    {cat.name}
                                                                </option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            )}
                                        </Field>
                                        <div>

                                            <Field name="keywords">
                                                {({ field, form: { touched, errors }, meta }: any) => (
                                                    <div className='flex flex-col gap-2'>
                                                        <label className="font-semibold text-sm   block  ">Keywords</label>

                                                        <textarea {...field} className="border-2 bg-gray-50 p-2 rounded w-[400px] h-[41.6px]"
                                                            placeholder="Keywords"
                                                            style={{
                                                                resize: 'vertical',
                                                                border: `${meta.touched && meta.error
                                                                    ? "2px solid red"
                                                                    : "1px solid gray"
                                                                    }`,
                                                            }}
                                                            onChange={(event) => {
                                                                const keywords = event.target.value.split(",").map((keyword: string) => keyword.trim());
                                                                props.setFieldValue("keywords", keywords);
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Field>
                                            <p className='text-[12px] ml-1'>Give keywords in comma seperated format(,)</p>
                                        </div>
                                        <Field name="pin">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  ">pin</label>
                                                    <div className='flex flex-row w-[400px] h-[41.6px]'>

                                                        <input
                                                            {...field}
                                                            class="form-check-input me-2"
                                                            type="checkbox"
                                                            id="pin"
                                                            // possible={true}
                                                            style={{
                                                                border: `${meta.touched && meta.error
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
                                                <div className='flex flex-col gap-2'>
                                                    <label className="font-semibold text-sm   block  ">Featured</label>
                                                    <div className='flex flex-row w-[400px] h-[41.6px]'>

                                                        <input
                                                            {...field}
                                                            class="form-check-input me-2"
                                                            type="checkbox"
                                                            id="featured"
                                                            // possible={true}
                                                            style={{
                                                                border: `${meta.touched && meta.error
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
                                        <div className='flex flex-col gap-2'>
                                            <label className="font-semibold text-sm   block  ">Featured</label>
                                            <div className='bg-blue-500 hover:bg-blue-700 py-1.5 px-5 rounded-lg text-white'>
                                                <button onClick={() => setOpenSelect(!openSelect)}>Open Image Selector</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shadow-md w-full overflow-x-auto">
                                        <ForwardRefEditor
                                            markdown={`Hello **world**!`}
                                            ref={mdxEditorRef}
                                        />
                                    </div>
                                    <div className='flex flex-row gap-y-5 gap-x-5 flex-wrap justify-center'>

                                        <button type="submit" className=" bg-blue-950 rounded-md p-2 text-white font-bold text-sm h-10 w-[100px]"> {craeteBlogResponse?.loading ? (
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
                                        )}</button>
                                    </div>
                                </div>

                            </Form>
                        )
                        }
                    </Formik >

                </div >

            </div >
        </div >)
}

export default CreatBlog


// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("../../components/MdxEditor"), {
    // Make sure we turn SSR off
    ssr: false,
});

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
    (props, ref) => <Editor {...props} editorRef={ref} />
);

// TS complains without the following line
ForwardRefEditor.displayName = "ForwardRefEditor";
