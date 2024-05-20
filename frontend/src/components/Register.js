import React,{useState} from 'react';
import { useDispatch } from "react-redux";
import {registerUser} from '../reducers/authSlice';
import { useNavigate } from "react-router-dom";
import logo from './images/logo.png';
const Register=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');
    const image=logo;
    const handleImage=()=>{
        navigate('/blogs');
      }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(username.length<5 || password.length<8){
            alert("Username Must Contain atleast 5 Characters and Password 8");
        }else{
             const response=await dispatch(registerUser({username,email,password}));
            setUsername('');
            setEmail('');
            setPassword('');
            if(response.meta.requestStatus==='fulfilled'){
                alert("User Registered SuccesFully");
                navigate('/login');
            }else{
                alert('Username Must be Unique!!');
            }
        }
        
        // console.log(response);
        
    }
    return(
        <>
        <img src={image} className="absolute top-0 left-0  w-20  h-20 m-8  sm:ml-16 rounded-full transition ease-in-out delay-200 hover:animate-bounce" alt="logo" onClick={handleImage}></img>
        <div className="shadow-[rgba(230,_230,_230,_0.4)_0px_30px_90px] mt-32 mx-auto my-12 sm:my-24 rounded-3xl w-9/12 sm:w-3/4 lg:w-1/2 xl:w-1/4 p-4 sm:p-2 bg-slate-100 hover:duration-300 hover:scale-105">
        <h2 className="text-pink-900 hover:text-pink-950 hover:animate-pulse text-3xl sm:text-2xl lg:text-3xl w-full p-2 text-center font-bold underline underline-offset-4">Register</h2>
        <form onSubmit={handleSubmit}>
            <div className="text-slate-950 m-2 font-bold">
                <label className="sm:m-4 m-2 text-lg sm:text-lg">Email</label>
                <input
                    className="text-slate-950 text-sm p-2 sm:m-2 lg:ml-4 bg-slate-100 rounded-xl w-full sm:w-11/12 border-2 border-slate-950 hover:-translate--1 duration-300 hover:scale-105"
                    type='email'
                    value={email}
                    placeholder='Enter Valid E-mail'
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="text-slate-950 m-2 font-bold">
                <label className="sm:m-4 m-2 text-lg sm:text-lg">Username</label>
                <input 
                    className="text-slate-950 text-sm p-2 sm:m-2 lg:ml-4 bg-slate-100 rounded-xl w-full sm:w-11/12 border-2 border-slate-950 hover:-translate--1 duration-300 hover:scale-105"
                    type='text'
                    value={username}
                    placeholder='Min length 5'
                    onChange={(e)=>setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="text-slate-950 m-2 font-bold">
                <label className="sm:m-4 m-2 text-lg sm:text-lg">Password</label>
                <input 
                    className="text-slate-950 text-sm p-2 sm:m-2 lg:ml-4 bg-slate-100 rounded-xl w-full sm:w-11/12 border-2 border-slate-950 hover:-translate--1 duration-300 hover:scale-105"
                    type='password'
                    value={password}
                    placeholder='Like a Snapchat,Google...'
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="w-full sm:w-2/4 m-2 p-2 sm:p-0 ">
                <button className="text-slate-100 w-11/12 sm:w-24  text-xl p-2 ml-1 m-2 mr-2 sm:ml-4 font-bold bg-sky-900 rounded-2xl hover:bg-sky-950 hover:animate-pulse" type="submit">Register</button>
               </div>
        </form>
    </div>
    </>
    
    );
};
export default Register;