import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import logo from './images/logo.png';
import LoadingSpinner from './LoadSpinner';
import { motion } from 'framer-motion';

const Backend_blog = process.env.REACT_APP_BACKEND_URI_BLOG;

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const image = logo;

  const handleImage = () => {
    navigate('/blogs');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Backend_blog}/blog/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error('Error in fetching Blog', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen px-4 py-6 bg-slate-900 flex flex-col justify-center items-center">
      <style>{`
        .prose img {
          display: inline block;
          margin: 0.5rem;
          width:75%;
          max-width:1400px;
          height: auto;
          border-radius: 0.50rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        .prose p {
          margin-top: 1.25rem;
          margin-bottom: 1.25rem;
          line-height: 1.8;
        }
        .prose img + * {
          margin-top: 1rem;
        }
        @media (max-width: 768px) {
          .prose img {
            width: 100%;
            max-width: 100%;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>

      <img
        src={image}
        className="absolute top-0 left-0 w-20 h-20 m-6 sm:ml-16 rounded-full transition hover:animate-bounce cursor-pointer"
        alt="logo"
        onClick={handleImage}
      />

      {blog ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-28 sm:mt-24 bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl mx-auto p-6 sm:p-10 max-w-7xl"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-800 underline underline-offset-4 hover:animate-pulse mb-6">
            {blog.title}
          </h2>

          <div
            className="prose prose-lg max-w-none text-slate-800 mb-6"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>

          <p className="text-sm text-slate-700 mb-3">
            <span className="font-bold text-blue-800">Tags:</span> {blog.tags}
          </p>

          <p className="text-sm mb-6 italic text-green-800 font-semibold">
            <span className="text-slate-900 font-bold">Author:</span> {blog.author}
          </p>

          {user === blog.author && (
            <div className="flex gap-4 flex-wrap">
              <Link
                to={`/blog/u/${blog._id}`}
                className="transition text-white  bg-amber-600 hover:bg-amber-800 px-8 py-4 rounded-2xl font-semibold hover:scale-105 duration-300"
              >
                Update
              </Link>
              <Link
                to={`/blog/d/${blog._id}`}
                className="transition text-white bg-red-600 hover:bg-red-800 px-8 py-4 rounded-2xl font-semibold hover:scale-105 duration-300"
              >
                Delete
              </Link>
            </div>
          )}
        </motion.div>
      ) : (
        <p className="text-white text-center mt-12 text-lg">Blog not found.</p>
      )}
    </div>
  );
};

export default SingleBlog;
