"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import { compressBase64ToJson } from "@/utils/methods";
import { MDXRemote } from "next-mdx-remote/rsc";
import '@mdxeditor/editor/style.css'

interface Author {
  firstName: string;
  lastName: string;
}

interface Thumbnail {
  path: string;
  altText: string;
}

interface BlogData {
  id: string;
  title: string;
  description: string;
  createdOn: string;
  author: Author;
  thumbnail: Thumbnail;
  content: string;
}

interface BlogResponse {
  getBlog: BlogData;
}

const SingleItem: React.FC = () => {
  const { id } = useParams();
  const [fetchItem, { data, loading, error }] = useLazyQuery(serverFetch);
  const [item, setItem] = useState<BlogData | null>(null);

  useEffect(() => {
    if (id) {
      fetchItem(
        `query GetBlog($where: whereBlogInput!) {
          getBlog(where: $where) {
            thumbnail {
              altText
              path
              description
              id
              name
              type
            }
            content
            createdOn
            author {
              firstName
              lastName
            }
            title
            category {
            id
            name
          }
            description
          }
        }`,
        {
          where: {
            id: {
              is: id,
            },
          },
        }
      );
    }
  }, [id]);
  function formatCategories(categories: any[]) {
    return Array.isArray(categories)
      ? categories.map((cat) => cat.name).join(", ")
      : "Uncategorized";
  }

  useEffect(() => {
    if (data) {
      setItem(data.getBlog);
    }
    if (error) {
      toast.error(error.message);
    }
  }, [data, error]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>No item found</p>;

  return (
    <div className="p-4 mt-20">
      {/* Card */}
      <div className="p-4 rounded-md shadow-md bg-white">
        <div className="relative w-full h-64">
          <Image
            src={item.thumbnail.path}
            alt={item.thumbnail.altText}
            layout="fill"
            // objectFit="cover"
            className="rounded-md object-contain"
          />
        </div>
        <div className="flex flex-row justify-between">

        <h1 className="text-2xl font-semibold mt-4">{item.title}</h1>
        <div className="text-lg text-[white] bg-green-600 ml-4">
                        {formatCategories(item?.category)}
                      </div>
        </div>
        <p className="text-gray-600 mt-2">{item.description}</p>
        <div className="text-gray-500 mt-4">
          {new Date(item.createdOn).toLocaleDateString()}
        </div>
      </div>

      {/* Content Outside the Card */}
      <div className="mt-6">
        {/* If using MDXRemote for rendering content */}
        {/* <MDXRemote {...item.content} /> */}
        {compressBase64ToJson(item.content)}


        
      </div>
    </div>
  );
};

export default SingleItem;
 