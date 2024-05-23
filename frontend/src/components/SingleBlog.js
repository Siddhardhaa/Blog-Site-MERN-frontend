import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import logo from './images/logo.png';
const Backend_blog=process.env.REACT_APP_BACKEND_URI_BLOG;
const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState('');
    const {user}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const image=logo;
    const handleImage=()=>{
        navigate('/blogs');
      }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${Backend_blog}/blog/${id}`);
                const data = response.data;
                setBlog(data);
                // console.log(data);
                
            } catch (err) {
                console.error("Error in fetching Blog", err);
            }
        }
        fetchData();
    }, [id]); 
    return (
        <div className="mx-auto">
        {blog ? (
            <>
                <img src={image} className="absolute top-0 left-0 ml-4 sm:ml-16 mt-2 w-20 mb-4 h-20 sm:ml-2 rounded-full transition ease-in-out delay-200 hover:animate-bounce" alt="logo" onClick={handleImage}></img>

                <div className='bg-slate-100 opacity-95 rounded-3xl mt-24 p-4 sm:p-8 m-4 sm:w-11/12 w-11/12 ml-4 sm:ml-12'>
                     <h2 className='text-slate-950 sm:text-3xl text-2xl p-2 ml-1 font-bold underline underline-offset-4 hover:text-slate-900 hover:animate-pulse'><strong>{blog.title}</strong></h2>
                    <p className='p-2 text-justify indent-14 sm:text-lg font-semibold'>{blog.content}</p>
                    <h2 className='text-lg font-bold text-blue-700 p-2 hover:text-blue-800'><strong className='text-slate-950'>Tags :</strong> {blog.tags}</h2>
                    <h3 className='text-lg font-bold text-green-700 p-2 hover:text-green-800'><strong className='text-slate-950'>Author :</strong>  {blog.author}</h3>
                    <div className="flex">
                        <button className='transition ease-in-out delay-150 text-slate-100 font-semibold p-4 m-1 bg-amber-600 hover:bg-amber-800 hover:-translate-y-1 duration-300 hover:scale-110 rounded-2xl'>{blog.author === user && <Link to={`/blog/u/${blog._id}`}>Update</Link>}</button>
                        <button className='transition ease-in-out delay-150 text-slate-100 font-semibold p-4 m-1 bg-red-600 hover:bg-red-900 hover:-translate-y-1 duration-300 hover:scale-110 rounded-2xl'>{blog.author === user && <Link to={`/blog/d/${blog._id}`}>Delete</Link>}</button>
                    </div>
                </div>
            </>
        ) : (
            <p>Loading...</p>
        )}
    </div>
    
    )
}

export default SingleBlog;
