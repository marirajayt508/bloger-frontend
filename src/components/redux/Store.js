import { configureStore } from '@reduxjs/toolkit';
import { Blogs } from './getBlogsSlice';


const store = configureStore({
  reducer: {
    blogs: Blogs,
  },
});
export default store;
