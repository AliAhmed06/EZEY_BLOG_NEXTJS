import React from 'react'

const Footer = () => {
  return (
    <div className='p-10 bg-yellow-500 text-white mt-10'>
      <div className='w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div>
          <h2 className='font-bold text-xl pb-5'>About Us</h2>
          <p className='text-justify'>This is some dummy text. This is some dummy text.This is some dummy text.This is some dummy text.This is some dummy text.This is some dummy text.This is some dummy text.This is some dummy text.</p>
        </div>

        <div  className='lg:pl-[100px]'>
          <h4 className='font-bold text-xl pb-5'>Contacts</h4>
          <p>Phone: +123 456789</p>
          <p>Phone: +123 456789</p>
          <p>Phone: +123 456789</p>
        </div>

        <div  className='lg:pl-[100px]'>
          <h4 className='font-bold text-xl pb-5'>Location</h4>
          <p>City: abc</p>
          <p>City: abc</p>
          <p>City: abc</p>
        </div>
      </div>
    </div>
  )
}

export default Footer