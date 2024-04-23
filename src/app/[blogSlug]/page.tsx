
import { serverFetch } from '@/action'
import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Metadata } from "next";
import { compressBase64ToJson } from '@/utils/methods'
import '@mdxeditor/editor/style.css'

export async function generateMetadata({ params }: { params: { blogSlug: string } }): Promise<Metadata> {
    const slug = `${params?.blogSlug}`
    const blog = await serverFetch(`query Author($where: whereBlogInput!) {
            getBlog(where: $where) {
            metaDescription
            metaTitle
            title
            }
        }`,
        {
            where: {
                slug: { is: slug }
            }
        },
        {
            cache: "no-store"
        }
    )


    if (blog.error || !blog || blog?.getBlog <= 0) {

    }

    return {
        title: blog?.getBlog?.metaTitle,
        description: blog?.getBlog?.metaDescription,
    }
}

const page = async ({ params }: { params: { blogSlug: string } }) => {
    const blogData = await serverFetch(
        `
        query Author($where: whereBlogInput!) {
            getBlog(where: $where) {
              author {
                id
                firstName
                lastName
              }
              content
              createdOn
              description
              featured
              id
              keywords
              metaDescription
              metaTitle
              status
              thumbnail {
                altText
                id
                path
              }
              title
            }
          }
        `,
        {
            where: {
                slug: {
                    is: params.blogSlug,
                },
            },
        },
        {
            cache: "no-store",
        }
    );

    return (
        <div className='h-screen'>
            <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed prose">
                <MDXRemote source={compressBase64ToJson(blogData?.getBlog?.content)} />
            </div>
        </div>
    )
}

export default page