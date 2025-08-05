import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Tranding() {
  const {blogs}=useAuth();
  const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
  return (
    <div>
      <h1 className="ml-20 font-bold text-3xl mb-8">Tranding</h1>
      <div className="container mx-auto gap-5">
          <Carousel responsive={responsive}>

         { blogs && blogs.length > 0 ? (
         blogs.slice(0,6).map((element)=>{
           return <Link to={`/blog/${element._id}`} key={element._id} className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            
            <div className=" group relative">
              <img src={element.blogphoto.url} className="w-full h-56 object-cover"></img>
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      {element.category}
                    </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300"></div>
              <h1 className="absolute bottom-4 left-4 text-white font-semibold  group-hover:text-yellow-400 ">{element.title}</h1>
            </div>
            <div className="p-6 flex items-center">
              <img src={element.adminphoto} alt="" className="w-12 h-12 rounded-full border-2 border-yellow-300" />
              <div className="ml-4">
              <p  className="text-lg font-semibold text-gray-800 ">{element.adminname}</p>
              <p className="text-sm text-gray-600">New</p>
              </div>
            </div>
           </Link>

        })
       ):(
        <div className="flex h-screen items-center justify-center">Loading...</div>

       )}
      </Carousel>

      </div>
    </div>
  )
}

export default Tranding;