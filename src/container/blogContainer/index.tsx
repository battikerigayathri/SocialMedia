"use client";
import { serverFetch } from "@/action";
import { useLazyQuery } from "@/hook";
import React, { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import toast, { Toaster } from 'react-hot-toast';
import BlogListCard from "@/components/blogListCard";
import { compressBase64ToJson } from "@/utils/methods";
import { useRouter } from "next/navigation";

const BlogContainer = () => {
  const [getBlog, { data, loading, error }] = useLazyQuery(serverFetch);
const router =useRouter()
  useEffect(() => {
    getBlog(
`query ListBlogs($limit: Int!) {
  listBlogs(limit: $limit) {
    docs {
      id
      title
      status
      author {
        firstName
        id
      }
      description
      thumbnail {
        path
        name
        altText
        description
      }
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
    offset
    limit
    totalDocs
  }
}`,{
  "limit": 10
},
      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    if (error) {
        toast.error(error?.message)
    }

  }, [data, loading, error]);


  return (
    <div className='flex flex-col w-[calc(100vw-260px)] gap-5' >
    <div className='flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center'>
        <h4 className='text-center font-bold text-[20px]'>Blogs</h4>
        <button className='bg-blue-950 text-white p-2 rounded-md' onClick={() => router.push("/blog/add")}>Add</button>
    </div>
    <div className="flex flex-col pt-5 h-[calc(100vh-170px)]" style={{ overflowY: "auto", overflowX: "hidden" }}>

      <div className="flex justify-center items-start gap-4 flex-wrap">
        {loading ? (
          <div className="flex flex-row justify-center">
            <DotLoader color="#007bea" />
          </div>
        ) : (
          data?.listBlogs?.docs.map((item: any, index: any) => (
            <div key={index}>
              <BlogListCard
                imgSrc={item.thumbnail.path}
                heading={item.title}
                description={item.description}
                created={item.createdOn}
                id={item.id}
              />
            </div>
          ))
        )}
      </div>

    </div>
    </div>

  );
};

export default BlogContainer;
