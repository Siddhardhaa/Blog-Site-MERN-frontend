import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const Backend_blog=process.env.REACT_APP_BACKEND_URI_BLOG;
// console.log(Backend_blog);
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async () => {
    try {
      const response = await axios.get(`${Backend_blog}/blog`);
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const addBlog=createAsyncThunk(
  'blogs/addBlog',
  async(blogData, { rejectWithValue })=>{
    try{
      const response=await axios.post(`${Backend_blog}/blog`,blogData);
      return response.data;
    }catch(error){
      throw Error(error.message);
    }
  }
);

export const updateBlog=createAsyncThunk(
  'blogs/updateBlog',
  async({id,title,content,tags})=>{
    try{
      const response=await axios.put(`${Backend_blog}/blog/${id}`,{title,content,tags});
      return response.data;
    }catch(err){
      throw Error(err.message);
    }
  }
);

export const deleteBlog=createAsyncThunk(
  'blogs/deleteBlog',async(id)=>{
    try{
      const response=await axios.delete(`${Backend_blog}/blog/${id}`);
      return response.data;
    }catch(err){
      throw Error(err.message);
    }
  }
)
const initialState = {
  blogs: [],
  status: 'idle', // Assuming initial status is 'idle'
  error: null,
};

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
      addBlog(state, action) {
        state.blogs.push(action.payload);
      },
      updateBlog(state, action) {
        const { id, title, content, tags } = action.payload;
        const existingBlog = state.blogs.find(blog => blog.id === id);
        if (existingBlog) {
          existingBlog.title = title;
          existingBlog.content = content;
          existingBlog.tags = tags;
        }
      },
      deleteBlog(state, action) {
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBlogs.pending, (state) => {
          state.status = 'loading..';
        })
        .addCase(fetchBlogs.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.blogs = action.payload;
        })
        .addCase(fetchBlogs.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(updateBlog.pending,(state)=>{
          state.staus='loading..';
        })
        .addCase(updateBlog.fulfilled,(state,action)=>{
          state.status='succeeded';
          state.blogs=action.payload;
        })
        .addCase(updateBlog.rejected,(state,action)=>{
          state.status='failed';
          state.error=action.error.message;
        })
        .addCase(deleteBlog.pending,(state)=>{
          state.status='loading..';
        })
        .addCase(deleteBlog.fulfilled,(state,action)=>{
          state.status='succeeded';
          state.blogs=state.blogs.filter((blog)=>blog.id!==action.payload.id);
        })
        .addCase(deleteBlog.rejected,(state,action)=>{
          state.status='Failed';
          state.error=action.error.message;
        })
    },
  });

export default blogSlice.reducer;
