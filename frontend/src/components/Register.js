import React,{useState} from 'react';
import { useDispatch } from "react-redux";
import {registerUser} from '../reducers/authSlice';
import { useNavigate } from "react-router-dom";
const Register=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await dispatch(registerUser({username,email,password}));
        setUsername('');
        setEmail('');
        setPassword('');
        // console.log(response);
        if(response.meta.requestStatus==='fulfilled'){
            alert("User Registered SuccesFully");
            navigate('/login');
        }else{
            alert('Username Must be Unique!!');
        }
    }
    return(
        <div className="shadow-[rgba(230,_230,_230,_0.4)_0px_30px_90px]  mx-auto my-24 rounded-3xl w-1/4 p-2 bg-slate-100 hover: duration-300 hover:scale-105"> 
            <h2 className='text-pink-900 hover:text-pink-950 hover:animate-pulse text-3xl  w-10/12 p-2 ml-28 font-bold  underline underline-offset-4'>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="text-slate-950 m-2 font-bold">
                    <label className="m-4 text-xl">Email</label>
                    <input
                        className="text-slate-950 text-lg p-4 m-2 bg-slate-100 rounded-3xl w-11/12 border-2 border-slate-950 hover:-translate--1 duration-300 hover:scale-105"
                        type='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="text-slate-950 m-2 font-bold">
                    <label className="m-4 text-xl">Username</label>
                    <input 
                        className="text-slate-950 text-lg p-4 m-2 bg-slate-100 rounded-3xl w-11/12 border-2 border-slate-950 hover:-translate--1 duration-300 hover:scale-105"
                        type='text'
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div className="text-slate-950 m-2 font-bold">
                    <label className="m-4 text-xl">Password</label>
                    <input 
                        className="text-slate-950 text-lg p-4 m-2 bg-slate-100 rounded-3xl w-11/12 border-2 border-slate-950 hover:-translate--1 duration-300 hover:scale-105"
                        type='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <button className="text-slate-100 w-28 text-xl p-4 m-2 ml-28 mb-4 font-bold text-slate-100 bg-sky-900 rounded-3xl hover:-translate--1 duration-300 hover:scale-105 hover:bg-sky-950 hover:animate-pulse" type='submit'>Register</button>
            </form>
        </div>
    );
};
export default Register;