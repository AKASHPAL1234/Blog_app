import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import Footer from "./component/Fotter.jsx";
import About from './component/pages/About.jsx';
import Dashboard from './component/pages/Dashbord.jsx';
import Contact from './component/pages/Contect.jsx';
import Creater from './component/pages/Creater.jsx';
import Login from './component/pages/Login.jsx';
import Register from './component/pages/Register.jsx';
import Blog from './component/pages/Blog.jsx';
import { useAuth } from "./context/AuthProvider.jsx";
import toast, { Toaster } from 'react-hot-toast';
import UpdateBlog from "./Dashboard/Updateblog.jsx";
import Detail from "./component/pages/Detailpage.jsx";
import NotFound from "./component/pages/NotFound.jsx";
import ResetPassword from "./component/pages/Resetpass.jsx";


function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/Dashboard", "/register", "/login","/*"].includes(location.pathname);
  
  const {  isAuthenication } = useAuth();

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route 
          path="/" 
          element={isAuthenication ? <Home /> : <Navigate to="/login" replace />} 
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creater" element={<Creater />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<Detail />} />
        <Route path="/blog/update/:id" element={<UpdateBlog />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
         <Route path="*" element={<NotFound/>} />
      </Routes>

      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
