import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../reducers/blogSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import LoadingSpinner from "./LoadSpinner";
import { motion } from "framer-motion";

const BlogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, status } = useSelector((state) => state.blogs);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [filterTag, setFilterTag] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const token = localStorage.getItem("token");

  const handleImage = () => navigate("/blogs");

  const handleAddPost = () =>
    token
      ? navigate("/create-post")
      : (alert("Please login to Add a Blog"), navigate("/login"));

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.clear();
      navigate("/blogs");
    }, 1000);
  };

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const extractFirstImage = (html) => {
    const match = html.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  };

  const filteredBlogs = blogs?.filter((blog) => {
    const tagMatch = filterTag
      ? blog.tags.toLowerCase().includes(filterTag.toLowerCase())
      : true;
    const authorMatch = filterAuthor
      ? blog.author.toLowerCase().includes(filterAuthor.toLowerCase())
      : true;
    return tagMatch && authorMatch;
  });

  if (status === "loading") return <LoadingSpinner />;
  if (status === "error")
    return (
      <p className="text-red-500 text-center mt-8">Error in Fetching Posts</p>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6}}
      className="min-h-screen text-white bg-gradient-to-tr from-[#1e1e2f] via-[#2d2d44] to-[#12121c] px-6 py-10"
    >
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 mb-6">
        <img
          src={logo}
          alt="Logo"
          className="w-16 h-16 rounded-full cursor-pointer"
          onClick={handleImage}
        />
        <div className="space-x-4">
          {!token ? (
            <>
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-700 text-white font-semibold px-4 py-2 rounded hover:bg-blue-900"
              >
                Register
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-cyan-700 text-white font-semibold px-4 py-2 rounded hover:bg-cyan-900"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center justify-center gap-2 bg-red-700 text-white font-semibold px-4 py-2 rounded hover:bg-red-900 transition duration-200 ${
                isLoggingOut ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {isLoggingOut && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>
      </nav>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 px-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-xl shadow-lg w-full sm:w-1/3 flex items-center gap-2"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by Tag"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-white flex-grow"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-xl shadow-lg w-full sm:w-1/3 flex items-center gap-2"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A10.956 10.956 0 011 11C1 5.477 5.477 1 11 1s10 4.477 10 10-4.477 10-10 10c-2.347 0-4.509-.76-6.246-2.043l-3.633.847z" />
          </svg>
          <input
            type="text"
            placeholder="Search by Author"
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-white flex-grow"
          />
        </motion.div>
      </div>

      {/* Blog Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-5xl w-full px-4">
          {filteredBlogs && filteredBlogs.length > 0 ? (
            filteredBlogs
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((blog) => {
                const imageUrl = extractFirstImage(blog.content);

                return (
                  <motion.div
                    key={blog._id}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="bg-white text-black rounded-2xl shadow-xl overflow-hidden border border-gray-200 transition-transform"
                    style={{
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)"
                    }}
                  >
                    <Link to={`/blog/${blog._id}`}>
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          loading="lazy"
                          alt={blog.title}
                          className="w-full h-44 object-cover"
                        />
                      ) : (
                        <div className="w-full h-44 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-lg">
                          No Image
                        </div>
                      )}
                      <div className="p-4">
                        <h2 className="text-sm font-bold text-gray-800 truncate" title={blog.title}>
                          {blog.title}
                        </h2>
                        <p className="text-xs text-gray-600 font-medium mt-1 italic">
                          By {blog.author}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
          ) : (
            <p className="text-white text-center col-span-full font-semibold">
              No matching blogs found.
            </p>
          )}
        </div>
      </div>

      {/* Add Blog Button */}
      <div className="flex justify-center mt-14">
        <button
          onClick={handleAddPost}
          className="bg-emerald-700 hover:bg-emerald-900 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Add Blog
        </button>
      </div>
    </motion.div>
  );
};

export default BlogList;
