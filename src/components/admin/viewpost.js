import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../../config';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getPosts } from '../redux/getBlogsSlice';
import jwtDecode from 'jwt-decode';

const Viewpost = ({ view, datas, admin=false,clearpost}) => {
  const [cmd, setCmd] = useState([]);
  const [ncmd, setNcmd] = useState('');
  useEffect(() => {
    setCmd([
    ...datas.commands
    ]);
  },[]);
  const dispatch = useDispatch()
  const addCmd = () => {
   if(ncmd.trim())
   { 
    let request = {
      "id" : datas._id,
      "data" :  {
        "username": name,
        "cmnd": ncmd,
      },
    }
    axios.patch(api+"addcomment",request).then((res)=>{
      toast.success("Command Added")
        setCmd([...cmd,{
          "username": name,
          "command": ncmd,
        }])  
        setNcmd("")
    }).catch((err)=>{
      toast.error("Check Your Network")
    })
    console.log(ncmd, cmd);}
  else{
    toast.error("Please Enter command to Add")
  }}
const name = jwtDecode(sessionStorage.getItem('aut')).username
  const deletePost = ()=>{
   axios.delete(api+`deletepost?id=${datas._id}&&name=${datas.image}`).then((res)=>{
    toast.success("Post Deleted")
    dispatch(getPosts())
   view(false)
   })
  
  }
  return (
    <div>
      <div className="card  p-1">
        <div className="card-title p-2 text-center">
          <h3>{datas.blogname}</h3>
        </div>
        <hr />
        <div className="text-center">
          <img src={api+datas.image} style={{ width: '20%' }} />
        </div>
        <hr />
        <div><strong><u>About</u></strong><p>{datas.description}</p></div>
        <hr />
        <div>
          <small>
            <u>Comments</u>
          </small>
       { !admin ?  <div>
            <textarea onChange={(e) => setNcmd(e.target.value)}></textarea>
            <div>
              <button className="btn btn-primary" onClick={() => addCmd()}>
                Add
              </button>
            </div><hr/>
          </div>:null}
          {cmd && cmd.length ? (
            cmd.map((val, ind) => {
              return (
                <div>
                  <u>{val.username}</u>
                  <div>
                    <small>{val.command}</small>
                  </div>
                </div>
              );
            })
          ) : (
            <div><small> No Comments Found </small></div>
          )}
        </div>
        <br />
       
        
        <div className="text-center">
          <button className="btn btn-info" onClick={() =>{ view(false)
          dispatch(getPosts())
          clearpost()
          }}>
            Back
          </button> &nbsp; {admin?
          <button className="btn btn-danger" onClick={()=>{deletePost()}}>delete</button> : null
        }
        </div>
      </div>
    </div>
  );
};

export default Viewpost;
