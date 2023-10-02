// "use client";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { AiFillDelete, AiFillLike, AiOutlineLike } from "react-icons/ai";
// import { BiSolidPencil } from "react-icons/bi";
// import { format } from "timeago.js";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import Comment from "@/app/components/comment/Comment";

// const BlogDetail = ({ params }) => {
//   const router = useRouter();
//   const [blogDetails, setBlogDetails] = useState("");
//   const [isLiked, setIsLiked] = useState(false);
//   const [blogLikes, setBlogLikes] = useState(0);
//   const { data:session, status } = useSession();
//   const [commentText, setCommentText] = useState("")
//   const [comments, setComments] = useState([])

//   useEffect(() => {
//     async function fetchComments() {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/comment/${params.id}`,{cache: "no-store",});
//       const comments = await res.json();
//       setComments(comments)
//     }
//     session && fetchComments();
//   }, [session]);

//   useEffect(() => {
//     async function fetchBlog() {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/blog/${params.id}`,{cache: "no-store",});
//       const blog = await res.json();
//       setBlogDetails(blog);
//       setIsLiked(blog?.likes?.includes(session?.user?._id));
//       setBlogLikes(blog?.likes?.length || 0 );
//     }
//     session && fetchBlog();
//   }, [session]);

//   const handleDelete = async () => {
//     try {
//       const confirmModel = confirm("you really want to delete your blog?");

//       if (confirmModel) {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/blog/${params.id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${session?.user?.accessToken}`,
//             },
//             method: "DELETE",
//           }
//         );

//         if (res.ok) {
//           toast.success("Blog Deleted Successfully");
//           router.push("/");
//           // setTimeout(() => {
//           //     window.location.reload();
//           // }, 500);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleLike = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/blog/${params.id}/like`,{
//           headers: {
//             Authorization: `Bearer ${session?.user?.accessToken}`,
//           },
//           method: "PUT",
//       });

//       if(res.ok){
//         if(isLiked){
//           setIsLiked(prev => !prev)
//           setBlogLikes(prev => prev - 1)          
//         } else {
//           setIsLiked(prev => !prev)
//           setBlogLikes(prev => prev + 1)
//         }
//       }
//     } catch (error) {
      
//     }
//   }
  
//   const handleComment = async () => {
//     if(commentText?.length < 2){
//       toast.error("Enter atleast 2 characters")
//       return
//     }

//     try {
//       const body = {
//         blogId: params.id,
//         authorId: session?.user?._id,
//         text: commentText
//       }

//       const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/comment`,{
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${session?.user?.accessToken}`,
//           },
//           method: "POST",
//           body: JSON.stringify(body)
//       });

//       const newComment = await res.json();
      
//       setComments((prev) => {
//         return [newComment, ...prev]
//       })

//       setCommentText("");
//     } catch (error) {
      
//     }
//   }
  
//   return (
//     <div className="flex items-center justify-center flex-col">
//       {/*  */}
//       {blogDetails ? (
//         <div className="bg-gray-100 shadow-md pb-3 w-[95%] md:w-[70%] lg:w-[500px] my-10 space-y-3">
//           <img
//             src={blogDetails?.imageUrl}
//             alt="blog image"
//             className="h-[300px] w-full object-cover"
//           />
//           <div className="font-bold p-3 text-2xl flex w-full items-center justify-between">
//             <h3>{blogDetails?.title}</h3>
//             {
//               // 
//               blogDetails?.authorId?._id.toString() === session?.user?._id.toString() ? (
//                 <div className="flex items-center text-sm gap-5">
//                   <Link
//                     href={`/blog/edit/${params.id}`}
//                     className="flex items-center gap-2 bg-green-500 py-2 px-5 rounded-md text-white hover:bg-opacity-80 "
//                   >
//                     Edit <BiSolidPencil />
//                   </Link>
//                   <button
//                     onClick={handleDelete}
//                     className="flex items-center gap-2 bg-red-500 py-2 px-5 rounded-md text-white hover:bg-opacity-80 "
//                   >
//                     Delete <AiFillDelete />{" "}
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <p className="text-black text-sm">
//                     Author:{" "}
//                     <span className="text-gray-500 font-bold">
//                       {blogDetails?.authorId?.username}
//                     </span>{" "}
//                   </p>
//                 </div>
//               )
//             }
//           </div>
//           <div className="p-3 font-bold text-sm flex items-center justify-between">
//             <div className="space-x-3">
//               <span className="font-normal">Category:</span>{" "}
//               <span>{blogDetails?.category}</span>
//             </div>
//             <div className="flex items-center gap-3">
//               {blogLikes || 0}{" "}
//               {isLiked ? (
//                 <AiFillLike onClick={handleLike} className="cursor-pointer" />
//               ) : (
//                 <AiOutlineLike
//                   onClick={handleLike}
//                   className="cursor-pointer"
//                 />
//               )}
//             </div>
//           </div>
//           <div className="p-3 text-sm ">
//             <p className="text-end text-xs">
//               <span className="font-bold">
//                 Posted:{" "}
//                 <span className="text-gray-500">
//                   {format(blogDetails?.createdAt)}
//                 </span>{" "}
//               </span>
//             </p>
//             <p className="text-gray-500">{blogDetails?.desc}</p>
//           </div>
//           <div className="bg-white pt-10">
//             <div className="flex items-center gap-5 justify-between p-3">
//               <img src={`/images/avatar.jpg`} className="h-[40px] w-[40px] rounded-full object-cover" alt="" />
//               <input 
//                 type="text" 
//                 value={commentText}
//                 className="w-full bg-gray-200 py-2 rounded-md px-5 outline-none text-gray-700"
//                 placeholder="Type Message..."
//                 onChange={(e) => setCommentText(e.target.value)}                
//               />
//               <button 
//                 className="bg-yellow-500 rounded-md py-1 px-3  hover:bg-opacity-80 text-white"
//                 onClick={handleComment}
//               >Post</button>
//             </div>
//             <div>
//               {
                
//                 comments?.length > 0 ?
//                 (
//                   comments.map((comment) => (                    
//                     <Comment key={comment._id} comment={comment} setComments={setComments} />                    
//                   ))
//                 ) :
//                 (
//                   <h4> no comments </h4>                  
//                 )
//               }
//             </div>
//           </div>
//         </div>
//       ) : (
//         <h2>Items does not exist</h2>
//       )}
//     </div>
//   );
// };

// export default BlogDetail;
