import ViewImageDetailsContainer from '@/container/ViewImageDetailsContainer'
import React from 'react'

const page = ({ params }: { params: { assetId: string } }) => {
    return (
        <div>
            <ViewImageDetailsContainer />
        </div>
    )
}

export default page