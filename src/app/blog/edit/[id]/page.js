// "use client";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { AiOutlineFileImage } from "react-icons/ai";
// import { toast } from "react-toastify";

// const EditBlogPage = (ctx) => {

//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [category, setCategory] = useState("Nature");
//   const [photo, setPhoto] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { data: session, status } = useSession();
//   const router = useRouter();

  
// useEffect(() => {
//     async function fetchBlog() {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/blog/${ctx.params.id}`);
//       const blog = await res.json();
      
//       setTitle(blog.title);
//       setDesc(blog.desc)
//       setCategory(blog.category)
//     }
//     fetchBlog();
//   }, []);
  
  
//   if (status === "loading") {
//     return (
//       <div className="h-[400px] flex items-center justify-center">
//         <img src="/images/loading.gif" alt="" className="h-[70px]" />
//       </div>
//     );
//   }

// //   if (status === "unauthenticated") {
// //     return (
// //       <div className="h-[400px] flex items-center justify-center">
// //         <p className="font-bold text-2xl">Access Denied</p>
// //       </div>
// //     );
// //   }


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !category || !desc) {
//       toast.error("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);
      
//       let imageUrl = null;
//       if(photo){
//         imageUrl = await uploadImage();
//       }

//       const body = {
//         title, desc, category
//       }
//       if(imageUrl != null){
//         body.imageUrl = imageUrl
//       }

//       const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/blog/${ctx.params.id}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${session?.user?.accessToken}`,
//         },
//         method: "PUT",
//         body: JSON.stringify(body),
//       });

//       if (res.ok) {
//         const blog = await res.json();
//         toast.success("Blog Updated Successfully");
//         setTimeout(() => {
//           router.push(`/blog/${blog?._id}`);
//         }, 1500);
//         return;
//       } else {
//         toast.error("Error occured while updating blog ");
//         console.log("error", res);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadImage = async () => {
//     if (!photo) return;

//     const formData = new FormData();

//     formData.append("file", photo);
//     formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

//     try {
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await res.json();

//       const imageUrl = data["secure_url"];

//       return imageUrl;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // toast.error("All fields are required");

//   return (
//     <div className=" h-[500px] flex items-center justify-center my-10">
//       <div className="w-full lg:w-[450px] border border-yellow-500 p-10">
//         <h2 className="font-bold text-xl text-yellow-500">Edit Blog</h2>
//         <form
//           onSubmit={handleSubmit}
//           className="w-full flex flex-col gap-3 mt-5"
//         >
//           <input
//             type="text"
//             placeholder="Enter Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="outline-none border border-gray-300 py-2 px-5 rounded-md focus:border-yellow-500"
//           />

//           <textarea
//             placeholder="Enter Description"
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//             className="outline-none border border-gray-300 py-2 px-5 rounded-md focus:border-yellow-500 h-[150px]"
//           ></textarea>

//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="text-gray-500 outline-none border border-gray-300 py-2 px-5 rounded-md focus:border-yellow-500"
//           >
//             <option value="Nature">Nature</option>
//             <option value="Mountain">Mountain</option>
//             <option value="Ocean">Ocean</option>
//             <option value="Wildlife">Wildlife</option>
//             <option value="Forest">Forest</option>
//           </select>

//           <label
//             htmlFor="image"
//             className="flex items-center gap-3 text-gray-500 cursor-pointer"
//           >
//             <span>Upload Image</span> <AiOutlineFileImage />
//           </label>
//           <input
//             type="file"
//             id="image"
//             onChange={(e) => setPhoto(e.target.files[0])}
//             className="hidden"
//           />

//           <button
//             type="submit"
//             className="bg-yellow-500 text-white py-2 rounded-md hover:bg-opacity-70"
//           >
//             {loading ? (
//               <img src="/images/loading.gif" alt="" className="h-[25px]" />
//             ) : (
//               "Edit"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditBlogPage;
