import axios from "axios";
import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { updateBlog } from "../reducers/blogSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Backend_blog=process.env.REACT_APP_BACKEND_URI_BLOG;
const Update=()=>{
    const {id}=useParams();
    const dispatch=useDispatch();
    // console.log(id);
    const navigate=useNavigate();
    const [blog,setBlog]=useState({title:'',content:'',tags:''});
    const HandleUpdate=(e)=>{
        e.preventDefault();
        dispatch(updateBlog({id,title:blog.title,content:blog.content,tags:blog.tags}));
        setBlog({title:'',content:'',tags:''});
        setInterval(navigate(`/blog/${id}`),1000);
    }
    const handleImage=()=>{
        navigate('/blogs');
      }
    useEffect(()=>{
        const fetchData= async ()=>{
            try{
                const response=await axios.get(`${Backend_blog}/blog/${id}`);
                const data = response.data;
                setBlog(data);
            }catch(err){
                console.error("Error in Fetching Blog Data",err);
            }
        }
        fetchData()
    },[id]);
  return(
<div className="mx-auto">
    <div className="bg-slate-100 opacity-95 rounded-3xl p-8 m-6 sm:m-24">
        <h2 className="p-2 m-2 text-3xl sm:text-4xl text-center font-bold text-amber-800 underline underline-offset-4 hover:animate-pulse"><b>Update</b></h2>
        <form onSubmit={HandleUpdate} >
            <div>
                <label className="text-xl font-semibold p-2 font-bold  underline underline-offset-4" htmlFor='title'>Title:</label>
                <input
                    className="hover:transition ease-in-out bg-gray-800 hover:bg-gray-950 rounded-3xl m-2 sm:m-4 text-slate-100 w-full p-4" 
                    type ="text"
                    id="title"
                    value={blog.title}
                    onChange={(e)=>setBlog({...blog,title:e.target.value})} />
            </div>
            <div>
                <label className="text-xl font-semibold p-2 font-bold underline underline-offset-4" htmlFor='content'>Content :</label>
                <textarea
                    className="hover:transition ease-in-out bg-gray-800 hover:bg-gray-950 rounded-3xl m-4 text-slate-100 p-2 text-justify w-full h-80 p-4" 
                    type="text"
                    id='content'
                    value={blog.content}
                    onChange={(e)=>setBlog({...blog,content:e.target.value})}
                />
            </div>
            <div>
                <label className="text-xl  font-semibold p-2 font-bold underline underline-offset-4" htmlFor="tags">Tags :</label>
                <input 
                    className="hover:transition ease-in-out bg-gray-800 hover:bg-gray-950 rounded-3xl m-4 text-slate-100 w-full p-4"
                    type='text'
                    id='tags'
                    value={blog.tags}
                    onChange={(e)=>setBlog({...blog,tags:e.target.value})}
                />
            </div>
            <button className="transition ease-in-out delay-150 text-slate-100 font-semibold p-4 m-4 bg-amber-600 hover:bg-amber-800 hover:-translate-y-1 duration-300 hover:scale-110 rounded-2xl hover:animate-pulse" type="submit">Update Blog</button>
        </form>
    </div>
</div>


);
    }
export default Update;