import { Link, useNavigate } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useAuth } from '../context/AuthProvider';
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utiles";


export default function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenication, setIsAuthenication } =useAuth();
  console.log(profile);
  console.log(isAuthenication);
  const navigateTo = useNavigate();



   const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/users/logout`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setIsAuthenication(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error( "Failed to logout");
    }
  };

  return (
    <>
      <nav className=" shadow-lg py-3 font-semibold font-serif">
        <div className="flex justify-between  container mx-auto ">
          <Link to="/">
            <div className="text-3xl font-bold">
              <h1>
                Sky<span className="text-red-600">Blog</span>
              </h1>
            </div>
          </Link>
          <div className=" justify-end mt-2 mx-3  ">
            <ul className="space-x-8 hidden md:flex">
              <Link to="/" className="hover:text-blue-500">
                Home
              </Link>
              <Link to="/blog" className="hover:text-blue-500">
                Blog
              </Link>
              <Link to="/creater" className="hover:text-blue-500">
                Creater
              </Link>
              <Link to="/about" className="hover:text-blue-500">
                about
              </Link>
              <Link to="/contact" className="hover:text-blue-500">
                Contact
              </Link>
            </ul>
            <div className="md:hidden" onClick={() => setShow(!show)}>
              {show ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineBars size={24} />
              )}
            </div>
          </div>

          <div className="space-x-2 mt-2  flex">
              {isAuthenication && profile?.role === "admin" ? (
            <Link
              to="/Dashboard"
              className="border bg-blue-500 hover:bg-blue-600 duration-300 p-2 rounded-md"
            >
              Dashboard
            </Link>
            ):(
              " "
            )}
             {!isAuthenication ? (
            <Link
              to="/login"
              className="border  bg-blue-500 hover:bg-blue-600 duration-300 p-2 rounded-md"
            >
              Login
            </Link>
            ) : (
              <div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>

        {/* mobile show  */}
        {show && (
          <div className=" md:hidden fixed  w-full h-screen bg-white z-50 flex flex-col items-center justify-center space-y-6 ">
            <ul className="md:hidden text-3xl space-y-4  ">
              <Link
                to="/"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-blue-500 flex "
              >
                Home
              </Link>
              <Link
                to="/blog"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-blue-500 flex"
              >
                Blog
              </Link>
              <Link
                to="/creater"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-blue-500 flex"
              >
                Creater
              </Link>
              <Link
                to="/about"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-blue-500 flex"
              >
                about
              </Link>
              <Link
                to="/contact"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeClass="active"
                className="hover:text-blue-500 flex"
              >
                Contact
              </Link>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
