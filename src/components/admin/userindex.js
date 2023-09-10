import React, { useEffect } from 'react';
import Navbar from '.././util/navbar';
import Showposted from './showpostes';
import { getPosts } from '.././redux/getBlogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
const Userindex = () => {
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  const aut = sessionStorage.getItem('aut');
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  try{
    const name = jwt_decode(aut).username;
  const authen = () => {
    if (!(aut)) {
      navigate('/');
    } else {
      return (
        <>
          <Navbar name={name} />
          {!state.blogs.error ? (
            <Showposted data={state.blogs} />
          ) : (
            <div className="text-center p-5 m-3">
              <strong className="text-danger">ERROR IN RESPONCE</strong>
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

export default Userindex;
