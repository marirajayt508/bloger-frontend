import React, { useEffect, useState } from 'react';
import Navbar from '.././util/navbar';
import Showposted from './showpostes';
import { getPosts } from '.././redux/getBlogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import {useNavigate } from 'react-router-dom';

const Adminindex = () => {
  const state = useSelector((state) => state);
  useEffect(() => {
    dispatch(getPosts());
    console.log(state)
  }, []);
  const aut = sessionStorage.getItem('aut');
  const dispatch = useDispatch();
  const admin = true;
  const navigate = useNavigate();
 
  try{
    const name = jwt_decode(aut).username;
  const authen = () => {
    if (!(aut)) {
      navigate('/');
    } else {
      return (
        <>
       <Navbar name={name} admin={admin} />
          {!state.blogs.error ? (
            <Showposted data={state.blogs} admin={admin} />
          ) : (
            <div className="text-center p-5 m-3">
              <strong className="text-danger">ERROR IN RESPONCE</strong>
              <div><button className="btn btn-primary" onClick={()=>{
                window.location.reload()
              }}>Refresh</button></div>
            </div>
          )}
        </>
      );
    }
  };
  return authen();
}
catch(err)
{
  navigate("/")
}
};

export default Adminindex;
