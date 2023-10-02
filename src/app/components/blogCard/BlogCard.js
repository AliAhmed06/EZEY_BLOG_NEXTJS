"use client"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';


const BlogCard = ({ blog : {title, desc, imageUrl, likes, authorId, _id} }) => {
  const {data:session, status} = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [blogLikes, setBlogLikes] = useState(0);

  useEffect(() => {
    session && likes && setIsLiked(likes.includes(session?.user?._id))
    session && likes && setBlogLikes(likes.length)
  }, [likes, session])  
  
  const handleLike = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/blog/${_id}/like`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          method: "PUT",
        }
      );

      if(res.ok){
        if(isLiked){
          setIsLiked(prev => !prev)
          setBlogLikes(prev => prev - 1)
          
        } else {
          setIsLiked(prev => !prev)
          setBlogLikes(prev => prev + 1)
        }
      }
    } catch (error) {
      
    }
  }

  return (
    <div className='shadow-md p-4 flex flex-col gap-3 rounded-xl'>
      <Link href={`/blog/${_id}`}> <img  src={imageUrl} alt="" className='h-[250px] w-full object-cover rounded-xl' /></Link>
      <div className='flex items-center justify-between'>
        <h4 className='font-bold text-xl'>{title}</h4>
        <div className='flex items-center gap-2'>
          <p>{blogLikes}</p>
          { isLiked ? <AiFillLike onClick={handleLike} /> : <AiOutlineLike onClick={handleLike} /> }          
        </div>
      </div>
      <p className='text-sm text-gray-400'>{desc}</p>
      <p className='text-sm'>
        Created By: <span className=' text-gray-400'>ss</span>
      </p>

    </div>
  )
}

export default BlogCard