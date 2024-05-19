import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./reducers/blogSlice";
import authSlice from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    blogs: blogSlice,
    auth: authSlice,
  },
});
