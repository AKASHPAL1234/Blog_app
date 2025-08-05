import { useEffect } from "react";
import { useState } from "react";

import { createContext } from "react";
import axios from "axios";
import { useContext } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenication, setIsAuthenication] = useState(false);

  useEffect(() => {
    const fetchprofile = async () => {
      try {
       
        
          const { data } = await axios.get(
          "https://sky-blog.onrender.com/api/users/myprofile",
          {
            withCredentials: true,
          }
        );

        console.log("User profile:", data.user);
        setProfile(data.user);
        setIsAuthenication(true);
        

        
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setIsAuthenication(false);
      }
    };

    const fetchblog = async () => {
      try {
        const response = await axios.get(
          "https://sky-blog.onrender.com/api/blog/allblog",
          { withCredentials: true }
        );
        console.log(response);
        setBlogs(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchblog();
    fetchprofile();
  }, []);
  return (
    <AuthContext.Provider value={{ blogs, profile, isAuthenication, setIsAuthenication }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
// export default AuthProvider
