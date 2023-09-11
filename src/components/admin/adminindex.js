import React, { useEffect, useState } from 'react';
import Navbar from '.././util/navbar';
import Showposted from './showpostes';
import { getPosts } from '.././redux/getBlogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import swal from "sweetalert2";
import {useNavigate } from 'react-router-dom';

const Adminindex = () => {
  const state = useSelector((state) => state);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  const aut = sessionStorage.getItem('aut');
  const dispatch = useDispatch();
  const admin = true;
  const navigate = useNavigate();
  function profile(name,role,email)
  {
    new swal({
      title : "My Profile",
      html: `<div>
        <strong>Username:</strong> ${name} <br/>
        <strong>Role:</strong> ${role == "user" ? "Reader" : "Writer"} <br/>
        <strong>Email:</strong> ${email} <br/>
        </div>`
    })

  }
  try{
    const role = jwt_decode(aut).role;
    const name = jwt_decode(aut).username;
    const email = jwt_decode(aut).email;
    
  const authen = () => {
    if (!(aut)) {
      navigate('/');
    } else {
      return (
        <>
       <Navbar name={name} admin={admin} profile={()=>{
        profile(name,role,email)
       }} />
          {!state.blogs.error ? (
            <Showposted data={state.blogs} admin={admin} username={name} />
          ) : (
            <div className="text-center p-5 m-3">
              <strong className="text-danger">Oops! Something went Wrong...</strong>
              <div><button className="btn btn-primary" onClick={()=>{
                window.location.reload()
              }}>Try Again</button></div>
            </div>
          )}
        </>
      );
    }
  };
  return  authen()
}
catch(err)
{
  navigate("/")
}
};

export default Adminindex;
