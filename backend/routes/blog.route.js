import express from 'express';
import {  createblog, deleteBlog, getAllBlog, getSingleblog, myBlog, updateBlog } from '../controllers/blog.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';
const router=express.Router();

router.post("/create",isAuthenticated,isAdmin("admin"),createblog)
router.delete("/delete/:id",isAuthenticated,isAdmin("admin"),deleteBlog)
router.get("/allblog",getAllBlog)
router.get("/singleblog/:id",getSingleblog)
router.get("/myblog",isAuthenticated,isAdmin("admin"),myBlog)
router.put("/update/:id",isAuthenticated,isAdmin("admin"),updateBlog)






export default  router;



