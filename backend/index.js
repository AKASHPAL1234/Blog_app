import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
const app = express();



const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL;
//middleware

app.use(cors({
   origin: process.env.FRONTEND_URL,
  credentials: true,
  methods:["GET","POST","PUT","DELETE"]
}));
app.use(cookieParser());
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);




mongoose
  .connect(mongo_url)
  .then(console.log("DB is connected"))
  .catch((e) => {
    console.log(e);
  });

//defining route

app.use("/api/users", userRoute);
app.use("/api/blog", blogRoute);

//cloudnary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key:process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.get("/", (req, res) => {
  res.send("hellow");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
