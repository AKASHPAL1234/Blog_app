import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white font-serif">
      {/* Background GIF */}
      <div
        className="w-full h-96 bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center"
        style={{
          backgroundImage:
            "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
        }}
      >
        <h1 className="text-[80px] font-bold text-black">404</h1>
        <h3 className="text-[80px] font-bold text-black">Not Found</h3>
      </div>

      {/* Content */}
      <div className="text-center -mt-12 px-4">
        <h3 className="text-2xl font-bold mb-4">Looks like you're lost</h3>
        <p className="text-gray-600 mb-6">
          The page you are looking for is not available!
        </p>
        <Link
          to="/"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-200"
        >
          Go to Home
        </Link>
      </div>
    </section>
  );
}
