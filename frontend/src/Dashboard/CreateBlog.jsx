import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utiles";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogphoto", blogImage);

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BACKEND_URL}/api/blog/create`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message || "Blog created successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Please fill the required fields");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">📝 Create Blog</h3>
        <form onSubmit={handleCreateBlog} className="space-y-6">

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label className="block mb-2 font-semibold text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Blog Image */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Blog Image</label>
            <div className="flex justify-center">
              <img
                src={blogImagePreview || "/imgPL.webp"}
                alt="Preview"
                className="w-full max-w-sm h-auto object-cover rounded-md"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          {/* About */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">About</label>
            <textarea
              rows="5"
              placeholder="Write something about your blog..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-white font-semibold rounded-md transition duration-200 ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating Blog..." : "Post Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
