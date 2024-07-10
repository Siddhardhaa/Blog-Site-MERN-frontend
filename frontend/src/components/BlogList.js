import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { fetchBlogs } from '../reducers/blogSlice';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/logo.png';
const BlogList = () => {
  const image=logo;
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { blogs, status } = useSelector((state) => state.blogs);
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  const handleRegisterButton = () => {
    navigate('/register');
  }
  const handleImage=()=>{
    navigate('/blogs');
  }
  const handleLoginButton = () => {
    navigate('/login');
  }
  const handleLogoutButton =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/blogs');
  }
  const handleAddPost = () => {
    if (token) {
      navigate('/create-post');
    } else {
      alert('Please login to Add a Blog');
      navigate('/login');
    }
  };

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="px-4 py-8">
      <nav className="p-8">
      <img src={image} className="absolute top-0 left-0  w-20 h-20 m-8 sm:ml-16 rounded-full transition ease-in-out delay-200 hover:animate-bounce" alt="logo" onClick={handleImage}></img>
      {!token && (
        <div className="flex justify-end mt-1">  
        <button onClick={handleRegisterButton} className="trasition ease-in-out delay-150 bg-blue-900 hover:-translate-y-1 hover:scale-110 duration-300 text-slate-100 font-semibold py-2 px-4 rounded-lg mr-2 sm:mr-2 bg-gradient-to-r from-blue-500 to-blue-600-blue-700 to-blue-800 to-blue-900 hover:bg-gradient-to-l from-blue-500 to-blue-600-blue-700 to-blue-800 to-blue-900 ring-1 ring-blue-700 hover:ring-sky-950 ring-opacity-50">Register
          </button>
          <button onClick={handleLoginButton} className="trasition ease-in-out delay-150 bg-cyan-900 hover:-translate-y-1 hover:scale-110 duration-300 bg-gradient-to-r from-cyan-500 to-cyan-600 to-cyan-700 to-cyan-600 to-cyan-500 hover:bg-gradient-to-l from-cyan-700 to-cyan-800 to-cyan-900 to-cyan-950 to-cyan-900 to-cyan-800 to-cyan-700 text-slate-100 font-semibold py-2 px-4 rounded-lg ring-1 ring-cyan-600 hover:ring-1 ring-cyan-900 ring-opacity-50 sm:mr-12">
            Login
          </button>
        </div>
      )}
      {token && (
        <div className="flex justify-end mt-1">  
        <button onClick={handleLogoutButton} className="trasition ease-in-out delay-150 bg-sky-700 hover:-translate-y-1 hover:scale-110 duration-300 text-slate-100 font-semibold py-2 px-4 rounded-lg mr-2 sm:mr-14 hover:bg-sky-950 ring-1 ring-blue-700 hover:ring-sky-950 ring-opacity-50">Logout
          </button>
          </div>)}
      </nav>
      <aside>
      </aside>
      {status === 'loading' && <p className="text-slate-100 text-center p-6">Loading...</p>}
      {status === 'error' && <p className="text-red-600 text-center p-6">Error in Fetching Posts</p>}
      <div className="px-4 py-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:w-11/12 sm:ml-12">
    {Array.isArray(blogs) && blogs.length > 0 ? (
    sortedBlogs.map((blog) => (
      <div key={blog._id} className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-200 bg-slate-200 rounded-3xl opacity-95 p-6">
        <h2 className="text-lg sm:text-xl  underline underline-offset-2 font-bold mb-2 text-slate-950 p-0.5">{blog.title}</h2>
        <p className="truncate hover:truncate-text-clip text-lg sm:text-xl text-gray-800 p-0.5 text-slate-950">{blog.content}</p>
        <p className="truncate hover:truncate-text-clip text-lg sm:text-xl text-gray-800 p-0.5 text-slate-950"><strong>Tags :</strong> {blog.tags}</p>
        <p className="text-lg sm:text-xl text-gray-800 p-1 pb-5 text-slate-950"><strong>Author :</strong> {blog.author}</p>
        <p className="p-1"></p>
        <Link to={`/blog/${blog._id}`} className="transition ease-in-out hover:scale-110 duration-300 hover:-translate-y-2 text-slate-200 hover:text-slate-100 bg-pink-700 hover:bg-pink-800 rounded-2xl p-4 border-slate-950">View</Link>
      </div>
    ))
  ) : (
    <p className="text-lg text-slate-100 ml-24 p-4 font-bold">Please Wait As it is Deployed as Free The server Go Down with inactivity of more than 30 min So kindly please wait!! the Response May take nearly 50 seconds! Thank you Have a Nice day</p>
  )}
</div>

      <button onClick={handleAddPost} className="trasition ease-in-out delay-150 hover:-translate--1 hover:scale-110 duration-300 m-4 ml-6 sm:ml-16 bg-emerald-700 hover:bg-emerald-900 text-white font-semibold py-3 px-6 rounded-lg ml-2">
        Add Blog
      </button> 
    </div>
  );
}

export default BlogList;
