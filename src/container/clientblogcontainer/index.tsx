"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import trail from "../../../public/assets/uploads/menbloger.png";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import toast from "react-hot-toast";
import Link from "next/link";
const Clientblogview = () => {
  // const blogcarddata = [
  //   {
  //     image: trail,
  //     title: "My titile",
  //     Author: "Author name",
  //     Date: "10/06/2024",
  //     discription:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Praesentium consectetur iure esse reprehenderit pariatur! Reiciendis voluptatem non sit, doloremque nostrum maior, ametconsectetur adipisicing elit. Praesentium consectetur iure essereprehenderit pariatur! Reiciendis voluptatem non sit,doloremque nostrum maior",
  //   },
  //   {
  //     image: trail,
  //     title: "My titile",
  //     Author: "Author name",
  //     Date: "10/06/2024",
  //     discription:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Praesentium consectetur iure esse reprehenderit pariatur! Reiciendis voluptatem non sit, doloremque nostrum maior, ametconsectetur adipisicing elit. Praesentium consectetur iure essereprehenderit pariatur! Reiciendis voluptatem non sit,doloremque nostrum maior",
  //   },
  //   {
  //     image: trail,
  //     title: "My titile",
  //     Author: "Author name",
  //     Date: "10/06/2024",
  //     discription:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Praesentium consectetur iure esse reprehenderit pariatur! Reiciendis voluptatem non sit, doloremque nostrum maior, ametconsectetur adipisicing elit. Praesentium consectetur iure essereprehenderit pariatur! Reiciendis voluptatem non sit,doloremque nostrum maior",
  //   },
  //   {
  //     image: trail,
  //     title: "My titile",
  //     Author: "Author name",
  //     Date: "10/06/2024",
  //     discription:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Praesentium consectetur iure esse reprehenderit pariatur! Reiciendis voluptatem non sit, doloremque nostrum maior, ametconsectetur adipisicing elit. Praesentium consectetur iure essereprehenderit pariatur! Reiciendis voluptatem non sit,doloremque nostrum maior",
  //   },
  // ];

  const [featuredposts, { data, loading, error }] = useLazyQuery(serverFetch);

  useEffect(() => {
    featuredposts(
      `query Docs($where: whereBlogInput, $sort: sortBlogInput) {
                listBlogs(where: $where, sort: $sort) {
                  docs {
                    author {
                      id
                      firstName
                      lastName
                    }
                    slug
                    createdOn
                    title
                    status
                    description
                    id
                    thumbnail {
                      id
                      path
                      altText
                    }
                    featured
                  }
                }
              }`,
      {
        sort: {
          createdOn: "asc",
        },
        where: {
          status: "PUBLISH",
          featured: true,
        },
      },
      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data, "mydata");
    }
    if (error) {
      toast.error(error?.message);
    }
  }, [data, loading, error]);

  const [pinPosts, mypinposts] = useLazyQuery(serverFetch);

  useEffect(() => {
    pinPosts(
      `query Docs($where: whereBlogInput, $sort: sortBlogInput) {
      listBlogs(where: $where, sort: $sort) {
        docs {
          author {
            id
            firstName
            lastName
          }
          createdOn
          title
          status
          description
          id
          thumbnail {
            id
            path
            altText
          }
          featured
        }
      }
    }
     `,
      {
        sort: {
          createdOn: "asc",
        },
        where: {
          pin: true,
          status: "PUBLISH",
        },
      }
    );
  }, []);

  useEffect(() => {
    if (mypinposts?.data) {
      console.log(data, "postsdata");
    }
    if (mypinposts?.error) {
      toast.error(error?.message);
    }
  }, [mypinposts?.data, mypinposts?.loading, mypinposts?.error]);

  const [latestblogs, mylatestblogs] = useLazyQuery(serverFetch);

  useEffect(() => {
    latestblogs(
      `query Docs($where: whereBlogInput, $sort: sortBlogInput, $limit: Int!) {
      listBlogs(where: $where, sort: $sort, limit: $limit) {
        docs {
          author {
            id
            firstName
            lastName
          }
          slug
          createdOn
          title
          status
          description
          id
          thumbnail {
            id
            path
            altText
          }
        }
      }
    }`,
      {
        where: {
          status: "PUBLISH",
        },
        limit: 4,
        sort: {
          createdOn: "asc",
        },
      }
    );
  }, []);

  useEffect(() => {
    if (mylatestblogs.data) {
      console.log(data, "latestdatabloga");
      if (mylatestblogs.error) {
        toast.error(error?.message);
      }
    }
  }, [mylatestblogs.loading, mylatestblogs.data, mylatestblogs.error]);

  function formatDate({ createdon }: { createdon: any }) {
    console.log(createdon, "sdf");
    const date = new Date(createdon);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="p-5 flex flex-row">
      <div>
        <div className="flex flex-row gap-2">
          <Link href={mylatestblogs?.data?.listBlogs.docs[0].slug || "#"}>
            <div className="w-[650px] h-[400px] border-gray-500 border-[1px] shadow-sm">
              <div>
                <text className="font-bold">
                  {mylatestblogs?.data?.listBlogs.docs[0]?.titile}
                </text>
              </div>
              <div>
                <text className="font-bold">
                  {mylatestblogs?.data?.listBlogs.docs[0]?.titile}
                </text>
              </div>
              <Image
                className=" w-650 h-400 object-cover"
                src={mylatestblogs?.data?.listBlogs.docs[0]?.thumbnail?.path}
                alt="image"
                height={1000}
                width={1000}
              />
            </div>
          </Link>
          <div className="flex flex-col gap-5">
            {mylatestblogs?.data?.listBlogs.docs
              ?.slice(1)
              .map((item: any, index: any) => (
                <Link
                  href={item.slug || "#"}
                  className="w-[300px] h-[120px] border-gray-500 border-[1px] shadow-sm p-1 text-left"
                >
                  <Image
                    className=" object-cover object-top w-full h-full"
                    src={item?.thumbnail?.path}
                    alt="image"
                    height={1000}
                    width={1000}
                  />
                </Link>
              ))}
          </div>
        </div>
        <div className="p-5">
          <h3>Latest Posts</h3>
        </div>
        <div className="grid grid-cols-3">
          {mypinposts?.data?.listBlogs.docs.map((item: any, index: any) => (
            <div className="w-[280px] h-[450px] border-gray-500 border-[1px] border-b-2">
              <div>
                <Image
                  className=" w-80 h-60 object-cover"
                  src={item?.thumbnail?.path}
                  alt="image"
                  height={1000}
                  width={1000}
                />
              </div>
              <div className="p-3">
                <div className="flex flex-col gap-[1px]">
                  <text className="font-bold text-blue-400">{item?.title}</text>
                  <div className="flex flex-row gap-4">
                    <text className="text-blue-400">
                      {item?.author?.firstName
                        ? item?.author?.firstName
                        : "not Available"}
                    </text>
                    <text className="text-blue-400">
                      {" "}
                      {item?.createdOn
                        ? formatDate({ createdon: item?.createdOn })
                        : "no date"}
                    </text>
                  </div>
                  <p className="text-sm line-clamp-6 pt-2 justify-center text-pretty">
                    {item?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="border-gray-400 border-[1px] w-[250px] h-[400px] p-3">
          <text>Recent Posts</text>
          {data?.listBlogs.docs.map((item: any, index: number) => {
            console.log(item, "item");
            return (
              <Link href={item.slug || "#"} className="flex flex-row  border-gray-500  gap-2 mt-2">
                <div className="w-[120px] h-[70px] border-[1px]">
                  <Image
                    className=" w-full h-full object-cover"
                    src={item?.thumbnail?.path}
                    alt="image"
                    height={70}
                    width={100}
                  />
                </div>
                <div className="flex flex-col gap-[1px]">
                  <text className="font-light">{item?.title}</text>
                  <text className="font-light text-sm">
                    {item?.author?.firstName
                      ? item?.author?.firstName
                      : "NotAvailable"}
                  </text>
                  <text className="font-light text-sm ">
                    {item?.createdOn
                      ? formatDate({ createdon: item?.createdOn })
                      : "no date"}
                  </text>
                </div>
              </Link>
            );
          })}
          <div className="ml-40">
            <text className="text-blue-400">View all</text>
          </div>
        </div>

        <div className="border-gray-400 border-[1px] w-[250px] h-[250px] p-3">
          <text>Archives</text>
        </div>
      </div>
    </div>
  );
};

export default Clientblogview;
