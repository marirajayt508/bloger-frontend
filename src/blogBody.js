import React from 'react';
import BlogRoute from './routes/route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './components/redux/Store';

const BlogBody = () => {
  return (
    <Provider store={store}>
      <BlogRoute />
      <ToastContainer />
    </Provider>
  );
};

export default BlogBody;
