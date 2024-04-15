"use client";
import { serverFetch } from "@/action";
import { useLazyQuery } from "@/hook";
import React, { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import toast, { Toaster } from 'react-hot-toast';
import BlogListCard from "@/components/blogListCard";
import { compressBase64ToJson } from "@/utils/methods";

const BlogContainer = () => {
  const [getBlog, { data, loading, error }] = useLazyQuery(serverFetch);

  useEffect(() => {
    // getBlog(
    //   GET_ALL_BLOGS,
    //   {},
    //   {
    //     cache: "no-store",
    //   }
    // );
  }, []);

  useEffect(() => {
    if (error) {
        toast.error(error?.message)
    }

  }, [data, loading, error]);


  return (
    <div className="bg-white p-6">
      <h2 className="text-black font-bold text-xl">Blogs</h2>
      <div className="flex justify-center items-start gap-4 flex-wrap">
        {loading ? (
          <div className="flex flex-row justify-center">
            <DotLoader color="#007bea" />
          </div>
        ) : (
          data?.listBlogs?.docs.map((item: any, index: any) => (
            <div key={index}>
              <BlogListCard
                imgSrc={item.thumbnail}
                heading={item.heading}
                description={item.description}
                created={item.createdOn}
                id={item.id}
                content={compressBase64ToJson(item.content)}
              />
            </div>
          ))
        )}
      </div>
      <Toaster />

    </div>
  );
};

export default BlogContainer;
