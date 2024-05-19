import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Backend_blog=process.env.REACT_APP_BACKEND_URI_BLOG;
const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState('');
    const {user}=useSelector((state)=>state.auth);
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
        <div className="">
            {blog ? (
                <>
                <div className='bg-slate-100 opacity-95 rounded-3xl p-8 m-12'>
                <h2 className='text-slate-950 text-3xl p-2 ml-1 font-bold underline underline-offset-4 hover:text-slate-900  hover:animate-pulse'><strong>{blog.title}</strong></h2>
                    <p className='text-lg p-2 text-justify indent-16 font-semibold'>{blog.content}</p>
                    <h2 className='text-lg font-bold text-blue-700 p-2 hover:text-blue-800'><strong className='text-slate-950'>Tags :</strong> {blog.tags}</h2>
                    <h3 className='text-lg font-bold text-green-700 p-2 hover:text-green-800'><strong className='text-slate-950'>Author :</strong>  {blog.author}</h3>
                    {/* {console.log(blog.author)} */}
                    <button className='trasition ease-in-out delay-150 text-slate-100 font-semibold p-4 m-1 bg-amber-600 hover:bg-amber-800 hover:-translate-y-1 duration-300 hover:scale-110 rounded-2xl'>{blog.author ===user && <Link to={`/blog/u/${blog._id}`}>Update</Link>}</button>
                    <button className='trasition ease-in-out delay-150 text-slate-100 font-semibold p-4 m-1 bg-red-600 hover:bg-red-900 hover:-translate-y-1 duration-300 hover:scale-110 rounded-2xl'>{blog.author ===user && <Link to={`/blog/d/${blog._id}`}>Delete</Link>}</button>
                </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default SingleBlog;
