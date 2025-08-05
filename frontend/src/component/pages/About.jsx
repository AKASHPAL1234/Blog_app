
function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-4">
          About <span className="text-blue-600">Me</span>
        </h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          Hi! I’m <span className="font-semibold">Akash Pal</span>, a passionate
          and dedicated <span className="font-semibold">BCA student</span> at{" "}
          Dr. Rammanohar Lohia Avadh University, Ayodhya, expected to graduate
          in 2026. I specialize in full-stack web development and love building
          impactful software solutions.
        </p>

        {/* What I Do */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b-2  text-blue-500 inline-block mb-4">
            What I Do
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <strong>Frontend Development:</strong> Modern, responsive UIs
              with HTML, CSS, JavaScript, React.js, and Tailwind CSS.
            </li>
            <li>
              <strong>Backend Development:</strong> Secure, scalable APIs using
              Node.js, Express.js, and MongoDB.
            </li>
            <li>
              <strong>Problem-Solving:</strong> Applying Data Structures and
              Algorithms to optimize performance.
            </li>
          </ul>
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b-2  text-blue-500 inline-block mb-4">
            Projects I’m Proud Of
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">SkyMoment AI – ChatGPT Clone</h3>
              <p className="text-gray-700">
                A smart chatbot using Google’s Gemini AI (@google/genai), with
                real-time conversation UI.
              </p>
            </div>
            <div>
              <h3 className="font-bold">YouTube Clone</h3>
              <p className="text-gray-700">
                Responsive video platform using React.js, Tailwind CSS, and
                RapidAPI for real-time video search.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Bookstore Web Application</h3>
              <p className="text-gray-700">
                Full-stack bookstore with product listings, cart system, and
                secure backend.
              </p>
            </div>
            <div>
              <h3 className="font-bold">ConvertApp – Unit Converter Tool</h3>
              <p className="text-gray-700">
                Responsive React app for converting length, weight, temperature,
                and more.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b-2  text-blue-500 inline-block mb-4">
            Technical Skills
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              <strong>Frontend:</strong> HTML, CSS, JavaScript, React.js,
              Tailwind CSS
            </li>
            <li>
              <strong>Backend:</strong> Node.js, Express.js, MongoDB
            </li>
            <li>
              <strong>Languages:</strong> C, C++, Java, Python
            </li>
            <li>
              <strong>Databases:</strong> SQL, MongoDB
            </li>
            <li>
              <strong>Tools:</strong> Git, GitHub, MS Office
            </li>
            <li>
              <strong>Core Concepts:</strong> Data Structures & Algorithms
              (DSA)
            </li>
          </ul>
        </section>

        {/* Languages */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b-2 text-blue-500 inline-block mb-4">
            Languages I Speak
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Hindi – Fluent</li>
            <li>English – Proficient</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold border-b-2 text-blue-500 inline-block mb-4">
            Let’s Connect
          </h2>
          <p className="text-gray-700">
            📧 Email:{" "}
            <a
              href="mailto:palankit86762@gmail.com"
              className="text-blue-600 hover:underline"
            >
              palankit86762@gmail.com
            </a>
          </p>
          <p className="text-gray-700">📞 Phone: 8922812510</p>
          <p className="text-gray-700">
            💻 GitHub:{" "}
            <a
              href="https://github.com/AKASHPAL1234"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              github.com/AKASHPAL1234
            </a>
          </p>
          <p className="text-gray-700">
            🌐 LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              linkedin.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
