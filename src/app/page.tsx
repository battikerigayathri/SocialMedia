
import BlogContainer from '@/container/blogContainer'
import Clientblogview from '@/container/clientblogcontainer'
import Blogs from '@/container/clientblogcontainer/blogs'
import React from 'react'

const page = () => {
    return (
        <>
      
        <div>
        {/* <Clientblogview/> */}
        <Blogs />
        </div>
        </>
    )
}

export default page