import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        // e.preventDefault();
        if (!username || !password) {
            setError("Username and password are required.");
        } else {
            try {
                e.preventDefault();
                const response= await dispatch(loginUser({ username, password }));
                setUsername("");
                setPassword("");
                if(response.meta.requestStatus==='fulfilled'){
                    navigate("/blogs");
                }else{
                    alert("Usernmae and passwrod are Wrong");
                }
            } catch (err) {
                console.error("Error in Login", err);
            }
        }
    };

    return (
        <div className="shadow-[rgba(230,_230,_230,_0.4)_0px_30px_90px] mx-auto my-12 sm:my-18 rounded-3xl w-11/12 sm:w-3/4 lg:w-1/2 xl:w-1/3 p-4 sm:p-2 bg-slate-100 hover:duration-300 hover:scale-105">
    <h2 className="text-pink-900 hover:text-pink-950 hover:animate-pulse text-3xl text-center sm:text-4xl w-11/12 sm:w-11/12 p-2 sm:ml-2 xl:ml-2 font-bold underline underline-offset-4"><b>Login</b></h2>
    {error && <p>{error}</p>}
    <form onSubmit={handleSubmit}>
        <div className="text-slate-950 p-2 m-2 font-bold">
            <label className="m-4 text-lg sm:text-xl">Email</label>
            <input
                className="text-slate-950 text-lg sm:text-xl p-4 m-2 bg-slate-100 rounded-3xl w-full sm:w-11/12 border-2 border-slate-950 hover:-translate--1 duration-300 hover:scale-105"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div className="text-slate-950 p-2 m-2 font-bold">
            <label className="m-4 text-lg sm:text-xl">Password:</label>
            <input
                className="text-slate-950 text-lg sm:text-xl p-4 m-2 bg-slate-100 rounded-3xl w-full sm:w-11/12 border-2 border-slate-950 hover:-translate--1 duration-300 hover:scale-105"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="w-full sm:w-2/4 m-2">
            <button className="text-slate-100 w-11/12 sm:w-24  text-xl p-4 m-2 ml-4 font-bold bg-sky-900 rounded-3xl hover:bg-sky-950 hover:animate-pulse" type="submit">Login</button>
            <p className="ml-4 sm:ml-8 mb-4 h-10 mb-4"><Link to={`/register`} className="text-slate-950">Not a user? <strong className="underline underline-offset-2 text-blue-500 hover:-translate-y-1 duration-300 hover:text-blue-700">Register</strong></Link></p>
        </div>
    </form>
</div>
    );
};

export default Login;
