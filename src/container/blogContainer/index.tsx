"use client";
import { serverFetch } from "@/action";
import { useLazyQuery } from "@/hook";
import React, { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import BlogListCard from "@/components/blogListCard";
import { compressBase64ToJson } from "@/utils/methods";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/BreadCrumbs";
// import Breadcrumbs from "@/components/BreadCrumbs";

const BlogContainer = () => {
  const [getBlog, { data, loading, error }] = useLazyQuery(serverFetch);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();
  useEffect(() => {
    getBlog(
      `query ListBlogs($limit: Int!,$sort: sortBlogInput) {
  listBlogs(limit: $limit,sort: $sort) {
    docs {
      id
      title
      slug
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
}`,
      {
        limit: 20,
        sort: {
          createdOn: "desc",
        },
      },

      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
  }, [data, loading, error]);

  const handleAddClick = () => {
    setIsAdding(true);
    router.push("/admin/dashboard/blog/add");
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Blogs" },
  ];

  return (
    <div className="flex flex-col w-[calc(100vw-230px)] gap-5 mt-16">
      <Breadcrumbs items={breadcrumbItems} /> 
      <div className=" pt-5">

    
      <div className="flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center">
        <h4 className="text-center font-bold text-[20px]">Blogs</h4>
        {/* <button
          className="bg-blue-950 text-white p-2 rounded-md"
          onClick={() => router.push("/admin/dashboard/blog/add")}
        >
          Add
        </button> */}

<button
          className="bg-blue-950 text-white p-2 rounded-md"
          onClick={handleAddClick}
          disabled={isAdding}
        >
          {isAdding ? (
            <DotLoader color="#ffffff" size={20} />
          ) : (
            "Add"
          )}
        </button>
      </div>
      <div
        className="flex flex-col pt-5 h-[calc(100vh-170px)]"
        style={{ overflowY: "auto", overflowX: "hidden" }}
      >
        <div className="flex justify-center items-start gap-4 flex-wrap">
        {loading ? (
            <div className="flex flex-row justify-center">
              <DotLoader color="#007bea" />
            </div>
          ) : (
            data?.listBlogs?.docs.map((item: any, index: any) => {
              // Handle category array or object
              const categoryNames = Array.isArray(item.category)
                ? item.category.map((cat: any) => cat.name).join(", ")
                : item.category?.name || "Uncategorized";
              return(
              <div
                key={index}
              >
                <BlogListCard
                  imgSrc={item.thumbnail?.path}
                  heading={item.title}
                  description={item.description}
                  categories={categoryNames}
                  created={item.createdOn}
                  id={item.id}
                  slug={item.slug}
                />
              </div>)
})
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default BlogContainer;
