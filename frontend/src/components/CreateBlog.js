import React, { useEffect, useState } from "react";
import { addBlog } from "../reducers/blogSlice"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const token=localStorage.getItem('token');
    // console.log(user);
    useEffect(()=>{
        if(!token){
            alert("login 1st then try to add Blogs");
            navigate('/login');
        }
    },[user,navigate,token]);
    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreate(); 
    };

    const handleCreate = async () => {
        try {
            await dispatch(addBlog({ title, content, tags, author: user }));
            setTitle('');
            setContent('');
            setTags('');
            navigate('/blogs');
        } catch (err) {
            console.error('Error in Creating Blog', err);
        }
    };

    return (
        <div className="mx-auto">
    <div className="shadow-[rgba(230,_230,_230,_0.2)_0px_30px_90px] bg-slate-100 opacity-95 sm:w-9/12 ml-4 sm:ml-12 m-8 rounded-3xl p-2">
        <h2 className="p-6 font-bold sm:text-3xl text-2xl text-center sm:text-left sm:ml-32  text-pink-800 hover:text-pink-950 underline underline-offset-4 hover:animate-pulse"><b>Create A New Blog</b></h2>
        <form onSubmit={handleSubmit}>
            <div className="flex items-center m-4">
                <label className="text-xl font-bold mr-4 w-20 text-right" htmlFor="title">Title:</label>
                <input 
                    placeholder="Write Your Title here..."
                    className="hover:transition ease-in-out text-left bg-slate-100 hover:-translate-y-1 duration-300 hover:scale-105 rounded-3xl text-slate-950 w-9/12 p-4 border-4 border-slate-950 font-semibold" 
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex items-center m-4">
                <label className="text-xl font-bold mr-4 w-18 text-right" htmlFor="content">Content:</label>
                <textarea
                    placeholder="Start Your Content here..."
                    className="hover:transition ease-in-out bg-slate-100 border-4 border-slate-950 hover:-translate-y-1 duration-300 hover:scale-105 rounded-3xl text-slate-950 font-semibold p-4 w-9/12 h-40"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="flex items-center m-4">
                <label className="text-xl font-bold mr-4 w-20 text-right" htmlFor="tags">Tags:</label>
                <input
                    placeholder="Add Some Tags..." 
                    className="hover:transition ease-in-out bg-slate-100 hover:-translate-y-1 duration-300 hover:scale-105 rounded-3xl text-slate-950 w-9/12 p-4 border-4 border-slate-950"
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>
            <button className="transition ease-in-out delay-150 text-slate-100 font-semibold p-4 m-4 ml-32 bg-teal-800 hover:bg-teal-950 hover:-translate-y-1 duration-300 hover:scale-110 rounded-2xl font-semibold hover:animate-pulse" type="submit">Create Blog</button>
        </form>
    </div>
</div>
    );
};

export default CreateBlog;
