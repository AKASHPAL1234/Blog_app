


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider";
// import { BACKEND_URL } from "../utiles";

// function UpdateBlog() {
//   const navigateTo = useNavigate();
//   const { id } = useParams();
//   const { setIsAuthenication } = useAuth();

//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [about, setAbout] = useState("");
//   const [blogImage, setBlogImage] = useState(null); // File for upload
//   const [blogImagePreview, setBlogImagePreview] = useState(""); // URL or base64

//   // Handle image selection & preview
//   const changePhotoHandler = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setBlogImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//       setBlogImage(file);
//     }
//   };

//   // Fetch blog data
//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const { data } = await axios.get(
//           `${BACKEND_URL}/api/blog/singleblog/${id}`,
//           { withCredentials: true }
//         );

//         setTitle(data?.title || "");
//         setCategory(data?.category || "");
//         setAbout(data?.about || "");

//         if (data?.blogphoto?.url) {
//           setBlogImagePreview(data.blogphoto.url);
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch blog details");
//       }
//     };
//     fetchBlog();
//   }, [id]);

//   // Update blog
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("category", category);
//     formData.append("about", about);

//     // Append file only if a new image is selected
//     if (blogImage) {
//       formData.append("blogphoto", blogImage);
//     }

//     try {
//       setIsAuthenication(true);
//       const { data } = await axios.put(
//         `${BACKEND_URL}/api/blog/update/${id}`,
//         formData,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       toast.success(data.message || "Blog updated successfully");
//       navigateTo("/Dashboard");
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to update blog");
//     }
//   };

//   return (
//     <div>
//       <div className="container mx-auto my-12 p-4">
//         <section className="max-w-2xl mx-auto">
//           <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
//           <form onSubmit={handleUpdate}>
//             {/* Category */}
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Category</label>
//               <select
//                 className="w-full p-2 border rounded-md"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 <option value="">Select Category</option>
//                 <option value="Devotion">Devotion</option>
//                 <option value="Sports">Sports</option>
//                 <option value="Coding">Coding</option>
//                 <option value="Entertainment">Entertainment</option>
//                 <option value="Business">Business</option>
//               </select>
//             </div>

//             {/* Title */}
//             <input
//               type="text"
//               placeholder="BLOG MAIN TITLE"
//               className="w-full p-2 mb-4 border rounded-md"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             {/* Blog Image */}
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">BLOG IMAGE</label>
//               <img
//                 src={blogImagePreview || "/imgPL.webp"}
//                 alt="Blog Main"
//                 className="w-full h-80 object-cover mb-4 rounded-md"
//               />
//               <input
//                 type="file"
//                 className="w-full p-2 border rounded-md"
//                 onChange={changePhotoHandler}
//               />
//             </div>

//             {/* About */}
//             <textarea
//               rows="6"
//               className="w-full p-2 mb-4 border rounded-md"
//               placeholder="Something about your blog..."
//               value={about}
//               onChange={(e) => setAbout(e.target.value)}
//             />

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               UPDATE
//             </button>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default UpdateBlog;


import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { BACKEND_URL } from "../utiles";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const { setIsAuthenication } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBlogImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setBlogImage(file);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blog/singleblog/${id}`,
          { withCredentials: true }
        );
        setTitle(data?.title || "");
        setCategory(data?.category || "");
        setAbout(data?.about || "");

        if (data?.blogphoto?.url) {
          setBlogImagePreview(data.blogphoto.url);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch blog details");
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    if (blogImage) {
      formData.append("blogphoto", blogImage);
    }

    try {
      setIsAuthenication(true);
      const { data } = await axios.put(
        `${BACKEND_URL}/api/blog/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message || "Blog updated successfully");
      navigateTo("/Dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
          ✏️ Update Blog
        </h3>
        <form onSubmit={handleUpdate} className="space-y-6">

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Category
            </label>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Blog Title
            </label>
            <input
              type="text"
              placeholder="Main Blog Title"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Blog Image */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Blog Image
            </label>
            <img
              src={blogImagePreview || "/imgPL.webp"}
              alt="Blog Preview"
              className="w-full h-64 sm:h-80 object-cover mb-4 rounded-md"
            />
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              onChange={changePhotoHandler}
            />
          </div>

          {/* About */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              About Blog
            </label>
            <textarea
              rows="6"
              className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Something about your blog..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBlog;
