import EditModal from '@/components/modal/EditModel'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'

// function New({imageurl,onclick,id,onEditclick}:{imageurl:string,onclick:()=>void,id:string,onEditclick:any}) {
function New({imageurl,onclick,id}:{imageurl:string,onclick:()=>void,id:string}) {
const router=useRouter()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  const handleEditClick = () => {
    setSelectedAssetId(id);
    setIsEditModalOpen(true);
    console.log("edit modal",id)
  };
  const confirmEdit = () => {
    console.log("confirm")
      setIsEditModalOpen(false);
      router.push(`/admin/dashboard/media/view/${id}?edit=true`);
      // {`/admin/dashboard/media/view/${id}?edit=false`}
    
  };

  const cancelEdit = () => {
    
    setIsEditModalOpen(false);
  };
  return (
    <div className='relative m-2 w-[200px] h-[200px]'>
            <img src={imageurl} alt={`media-${id}`} className='object-contain w-full h-full' />
            <div className='flex flex-row gap-1 absolute top-2 right-2'>
                {/* <Link href={`/admin/dashboard/media/view/${id}?edit=false`}> */}
                <div className='bg-blue-400 w-[20px] h-[20px] rounded-md flex flex-row justify-center items-center'><FiEdit className='text-[black] text-xs align-middle cursor-pointer' onClick={()=>handleEditClick()} /></div>
                {/* </Link> */}
                <div className='bg-red-500 w-[20px] h-[20px] rounded-md flex flex-row justify-center items-center'><FiTrash className='text-[black] text-xs  cursor-pointer' onClick={onclick} /></div>
            </div>
            <EditModal
        isOpen={isEditModalOpen}
        onConfirm={confirmEdit}
        onCancel={cancelEdit}
        onClose={cancelEdit}
      />
        </div>
        
  )
}

export default New



