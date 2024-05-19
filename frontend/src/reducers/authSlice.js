import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const Backend_auth=process.env.REACT_APP_BACKEND_URI_AUTH;
// console.log(Backend_auth);
export const loginUser = createAsyncThunk(
    'auth/auth/login',
    async ({ username, password }) => {
        try {
            const response = await axios.post(`${Backend_auth}/auth/login`, { username, password });
            //  console.log(response);
            const token=response.data.token;
            localStorage.setItem('token',token);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const registerUser=createAsyncThunk(
    'auth/auth/register',
     async({username,email,password})=>{
        try{
            const response=await axios.post(`${Backend_auth}/auth/register`,{username,email,password});
            return response.data;
        }catch(error){
            throw Error(error.message);
        }
  }
);
export const resetPassword=createAsyncThunk(
    'auth/reset',
    async({email})=>{
        try{
            const response=await axios.post(`${Backend_auth}/auth/reset`,{email});
            console.log(response.data);
            return response.data;
        }catch(error){
            throw Error(error.message);
        }
    }
);
const initialState={
    user:null,
    token:null,
    status:'idle',
    error:null,
};
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.status='loading';
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.status='Succeeded';
            state.user=action.payload.username;
            state.token=action.payload.token;
            state.error=null;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.message;
        })
        .addCase(registerUser.pending,(state)=>{
            state.status='loading..';
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.status='Succeeded';
            state.user=action.payload.user;
            state.token=action.payload.token;
            state.error=null;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.message;
        })
        .addCase(resetPassword.pending,(state)=>{
            state.status='loading..';
        })
        .addCase(resetPassword.fulfilled,(state)=>{
            state.status='Succeeded';
            state.error=null;
        })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.message;
        })
    }
    },
);
export const authSelector=(state)=>state.auth;
export default authSlice.reducer;