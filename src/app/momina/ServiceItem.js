import React from 'react'
import { BsThreeDots } from 'react-icons/bs';

const ServiceItem = ({image, title, desc}) => {
  return (
    <div className='bg-red-100 flex flex-col items-center justify-center '>
        <img  
            src={image} 
            alt=""
            className='h-[50px] w-[50px] object-cover object-center' 
        />
        <h2 className='text-xl font-bold'>{title}</h2>
        <BsThreeDots className='text-orange-700 text-2xl' />
        <p className='text-center text-sm text-gray-500'>{desc}</p>    
    </div>
  )
}

export default ServiceItem