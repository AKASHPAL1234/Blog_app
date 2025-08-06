import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createblog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog photo is required" });
    }
    const { blogphoto } = req.files;

    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogphoto.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg and png are allowed",
      });
    }
    const { title,category,about } = req.body;
    if (
      !title ||
      !category ||
      !about 
    ) {
      return res.status(400).json({ message: "Title,categroy,about must be required" });
    }
    const adminname=req?.user?.name;
    const adminphoto=req?.user?.photo?.url;
    const createdBy=req?.user?._id;
   
    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogphoto.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }


    const blogData ={
      title,
      category,
      about,
      adminname,
      adminphoto,
      createdBy,
      blogphoto: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };
    const blog=await Blog.create(blogData);
    
      res.status(201).json({
        message: "Blog created successfully",
        blog,

      });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }

};

export const deleteBlog=async (req,res)=>{
  const {id}=req.params;
  const blog=await Blog.findById(id);
  if(!blog){
    return res.status(401).json({error:"Blog not found"});
  }
  await blog.deleteOne();
  return res.status(200).json({message:"blog deleted sucessfully"})

}


export const getAllBlog=async(req,res)=>{
  const allBlog=await Blog.find();
  res.status(200).json(allBlog)
}


export const getSingleblog=async(req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(401).json({error:"invalid Blog id"})
  }
  const blog=await Blog.findById(id);
  if(!blog){
  return res.status(401).json({error:"Blog not found"});
}
     res.status(200).json(blog)
 
}


export const myBlog=async(req,res)=>{
  const createdBy=req.user._id;
  const myBlog=await Blog.find({createdBy})
  res.status(200).json(myBlog)
}

export const updateBlog=async(req,res)=>{
  const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(401).json({error:"invalid Blog id"})
  }
  const updateblog=await Blog.findByIdAndUpdate(id,req.body,{new:true})
  if(!updateblog){
  return res.status(401).json({error:"Blog not found"});
  }
  res.status(200).json(updateblog)


}




