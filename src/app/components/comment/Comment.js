import { useSession } from 'next-auth/react'
import React from 'react'
import { AiFillAccountBook } from 'react-icons/ai';
import { BiSolidTrash } from 'react-icons/bi';
import { format } from 'timeago.js';

const Comment = ({comment, setComments}) => {
  const {data:session} = useSession();
  const token = session?.user?.accessToken;

  console.log("comment = " + comment?._id)
  const handleDeleteComment = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/comment/${comment?._id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'DELETE'
      });

      setComments(prev => {
        return [...prev].filter((c) => c?._id !== comment?._id)
      })
      
    } catch (error) {
      
    }
      
  }
  return (
    <div className='p-5'> 
      <div className='flex'>
        <div className='flex-1 flex gap-3'>
          <img src="/images/avatar.jpg" className='h-[35px] w-[35px] object-cover rounded-full' alt="" />
          <div className='flex flex-col'>
            <h4 className='font-bold'>{comment?.authorId?.username}</h4>
            <span className='text-gray-500 text-xs'>{format(comment?.createdAt)}</span>
          </div>
          <span className='text-gray-500'>{comment?.text}</span>          
        </div>
        <div>
          {session?.user._id === comment?.authorId?._id && (
            <>
            <BiSolidTrash onClick={handleDeleteComment} className='cursor-pointer text-gray-700' />            
            </>
            
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment