"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import trail from "../../../public/assets/uploads/menbloger.png";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import toast from "react-hot-toast";
const Clientblogview = () => {
  const blogcarddata = [
    {
      image: trail,
      title: "My titile",
      Author: "Author name",
      Date: "10/06/2024",
      discription:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Praesentium consectetur iure esse reprehenderit pariatur! Reiciendis voluptatem non sit, doloremque nostrum maior, ametconsectetur adipisicing elit. Praesentium consectetur iure essereprehenderit pariatur! Reiciendis voluptatem non sit,doloremque nostrum maior",
    },
    {
      image: trail,
      title: "My titile",
      Author: "Author name",
      Date: "10/06/2024",
      discription:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Praesentium consectetur iure esse reprehenderit pariatur! Reiciendis voluptatem non sit, doloremque nostrum maior, ametconsectetur adipisicing elit. Praesentium consectetur iure essereprehenderit pariatur! Reiciendis voluptatem non sit,doloremque nostrum maior",
    },
    {
      image: trail,
      title: "My titile",
      Author: "Author name",
      Date: "10/06/2024",
      discription:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Praesentium consectetur iure esse reprehenderit pariatur! Reiciendis voluptatem non sit, doloremque nostrum maior, ametconsectetur adipisicing elit. Praesentium consectetur iure essereprehenderit pariatur! Reiciendis voluptatem non sit,doloremque nostrum maior",
    },
    {
      image: trail,
      title: "My titile",
      Author: "Author name",
      Date: "10/06/2024",
      discription:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Praesentium consectetur iure esse reprehenderit pariatur! Reiciendis voluptatem non sit, doloremque nostrum maior, ametconsectetur adipisicing elit. Praesentium consectetur iure essereprehenderit pariatur! Reiciendis voluptatem non sit,doloremque nostrum maior",
    },
  ];
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
  return (
    <div className="p-5 flex flex-row">
      <div>
        <div className="flex flex-row gap-2">
          <div className="w-[650px] h-[400px] border-gray-500 border-[1px] shadow-sm">
            blogvie
          </div>
          <div className="flex flex-col gap-5">
            <div className="w-[300px] h-[120px] border-gray-500 border-[1px] shadow-sm p-1 text-left">
              Latest Blogs list
            </div>
            <div className="w-[300px] h-[120px] border-gray-500 border-[1px] shadow-sm p-1 text-left">
              Latest Blogs list
            </div>
            <div className="w-[300px] h-[120px] border-gray-500 border-[1px] shadow-sm p-1 text-left">
              Latest Blogs list
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3>Latest Posts</h3>
        </div>
        <div className="grid grid-cols-3  pt-3 ">
          {blogcarddata.map((item, index) => (
            <div className="w-[280px] h-[450px] border-gray-500 border-[1px]">
              <div>
                <Image
                  className=" w-80 h-60 object-cover"
                  src={item?.image}
                  alt="image"
                  height={1000}
                  width={1000}
                />
              </div>

              <div className="p-3">
                <div className="flex flex-col gap-[1px]">
                  <text>{item.title}</text>
                  <div className="flex flex-row gap-4">
                    <text>{item.Author}</text>
                    <text>{item.Date}</text>
                  </div>
                  <p className="text-sm text-pretty ">{item.discription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="border-gray-400 border-[1px] w-[250px] h-[400px] p-3">
          <text>Recent Posts</text>
          {data?.listBlogs.docs.map((item:any,index:number)=>{
            console.log(item?.thumbnail.path,"item")
            return(
          <div className="flex flex-row w-[130px] h-[70px] border-gray-500 border-[1px] gap-[150px]">
            <div>
              <Image
                className=" w-80 h-60 object-cover"
                src={item?.thumbnail.path}
                alt="image"
                height={1000}
                width={1000}
              />
            </div>
            <div className="flex flex-col gap-[1px]">
              <text className="font-light">{item?.title}</text>
              <text className="font-light">{item?.author?.firstName}</text>
              <text className="font-light">{item?.date}</text>
            </div>
          </div>)})}
        </div>

        <div className="border-gray-400 border-[1px] w-[250px] h-[250px] p-3">
          <text>Archives</text>
        </div>
      </div>
    </div>
  );
};

export default Clientblogview;
