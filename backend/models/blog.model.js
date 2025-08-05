import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  blogphoto: {
   public_id:{
    type:String,
    required:true
   },
   url:{
    type:String,
    required:true

   }
  },
  category: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    
  },
  adminname:{
    type:String,
    // required:true
  },
  adminphoto:{
     type:String,
    required:true

  },
  createdBy: {
    type:mongoose.Schema.ObjectId,
    ref:"User"
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
