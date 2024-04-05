import React from 'react'

const page = ({ params }: { params: { assetId: string } }) => {
    return (
        <div>{params.assetId}</div>
    )
}

export default page