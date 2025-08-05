import { useState } from "react";
import { useAuth } from "../../context/AuthProvider"
import MyBlog from "../../Dashboard/MyBlog";
import MyProfile from "../../Dashboard/MyProfile";
import Sidebar from "../../Dashboard/Sidebar";
import UpdateBlog from "../../Dashboard/Updateblog";
import { Navigate } from "react-router-dom";
import CreateBlog from "../../Dashboard/CreateBlog";

function Dashbord() {
  const {profile,isAuthenication}=useAuth();
  const [component, setComponent] = useState("My Blog");

  console.log(profile)
  console.log(isAuthenication)
  if (!isAuthenication) {
    return <Navigate to={"/"} />;
  }
  
  return (
     <div>
      <div>
        <Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlog />
        )}
      </div>
    </div>
  )
}

export default Dashbord