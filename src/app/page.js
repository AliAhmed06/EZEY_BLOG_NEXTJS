import React from 'react'
import BlogCard from './components/blogCard/BlogCard'

const getBlogs = async () => {
  let res = await fetch(`${process.env.DOMAIN_NAME}/api/blog`, {cache: 'no-store'});
  return res.json();
}

const HomePage = async () => {
  const blogData = await getBlogs();
  return (
    <div>
      <div className='w-[80%] mx-auto mt-10 flex flex-col items-center'>
        <h2 className='font-bold text-3xl'>Welcome to EzeyBlog</h2>
        { blogData?.length > 0 ? (
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>
          {blogData?.map((blog) => {
            return <BlogCard key={blog._id} blog={blog} />
          })}
        </div>
        ) : (
          <h2>No blogs to show</h2>
        )  }
      </div>
    </div>
  )
}

export default HomePage