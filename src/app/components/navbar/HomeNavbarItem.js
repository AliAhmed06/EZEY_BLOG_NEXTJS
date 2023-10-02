import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react'

const HomeNavbarItem = () => {
    const [open, setOpen] = useState(false);
  return (
    <div className="cursor-pointer relative group hidden md:block">
        <img src="/images/avatar.jpg" alt="" className="h-[40px] rounded-full object-top object-cover" />
        <div className={`absolute right-0   shadow-md bg-white hidden group-hover:block `}>
            <div className=' p-5 w-[150px] flex flex-col items-center gap-2'>
              <button
                onClick={signOut}
                className='text-gray-500 hover:text-white hover:bg-yellow-500 w-full text-start px-3  rounded-md py-1'
              >Logout</button>              
              <Link 
                href="/create-blog" 
                className='text-gray-500 hover:text-white hover:bg-yellow-500 w-full text-start px-3  rounded-md py-1'                
              >Create Blog</Link>
            </div>
        </div>
    </div>
  )
}

export default HomeNavbarItem