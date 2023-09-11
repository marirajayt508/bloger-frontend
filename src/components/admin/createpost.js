import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { api } from '../../config';
import { getPosts } from '../redux/getBlogsSlice';
import { useDispatch } from 'react-redux';

const Createpost = ({ updatedata = false, back, user }) => {
  const [data, setData] = useState({});
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [des, setDes] = useState('');
  const [img, setImg] = useState('');
  const [pimg, setpImg] = useState('');
  useEffect(() => {
    if (updatedata) {
      setData(updatedata);
      setTitle(updatedata.blogname);
      setTag(updatedata.tagline);
      setDes(updatedata.description);
      setImg(updatedata.image);
    } else {
      setData(false);
    }
  }, []);
  const dispatch = useDispatch()
  const create = () => {
    if (title.trim() && tag.trim() && des.trim() && img ) {
      let formdata = new FormData()
      formdata.append("blogname",title)
      formdata.append("tagline", tag)
      formdata.append("description",des)
      formdata.append("image",img)
      formdata.append("by",user)
      axios.post(api+"addpost",formdata,
      {
        headers : {"Content-Type" : "multipart/formdata"}
      }).then((res)=>{
        dispatch(getPosts())
        toast.success('Post Created');        
      }).catch((err)=>{
        toast.error('Check Your Network');
      })
      
    } else {
      toast.error('Fill All Fields');
    }
  };
  const edit = () => {
    setTitle(title)
    setTag(tag)
    setDes(des)
    console.log(title)
       let formdata = new FormData()
      formdata.append("blogname",title)
      formdata.append("tagline", tag)
      formdata.append("description",des)
      formdata.append("image",img)
      formdata.append("by",username)
      axios.put(api+"updatepost/"+updatedata._id,formdata,
      {
        headers : {"Content-Type" : "multipart/formdata"}
      }).then((res)=>{
        dispatch(getPosts())
        toast.success('Post Updated');   
        back()     
      }).catch((err)=>{
        toast.error('Check Your Network');
      })
  };
  const setImgFnc = (images)=>{
    if(images[0].type.includes("image"))
    {
      let preview = URL.createObjectURL(images[0])
      setpImg(preview)
      setImg(images[0])
    }
else{
toast.error("Chose image alone")
}
  }
  return (
    <div className="card p-3">
      <div className="text-center">
        <strong>{data ? 'Edit Post' : 'Crete Newpost'}</strong>
      </div>
      <hr />
      <div className="p-3 m-3">
        <div>
          {' '}
          <div>
            <small>{!data ? null : 'Title'}</small>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder={data ? null : 'Enter Title'}
            defaultValue={!data ? null : title}
            onChange={(e) => setTitle(e.target.value)}
          />{' '}
        </div>
        <br />
        <div>
          <div>
            <small>{!data ? null : "Tagline"}</small>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder={data ? null : 'Enter Tagline'}
            defaultValue={!data ? null : tag}
            onChange={(e) => setTag(e.target.value)}
          />{' '}
        </div>
        <br />
        <div>
          <small>{!data ? 'Choose ' : 'Edit '} Image</small>
          <div >{data && !pimg ? <img src={api+img} style={{width : "30%"}}/> : pimg ? <img src={pimg} style={{width : "30%"}}/>:null}</div>
          <div>
            <input
              type="file"
              onChange={(e) => {
                setImgFnc(e.target.files);
              }}
            />
          </div>
        </div>
        <br />
        <div>
          <div>
            <small>{!updatedata ? null : 'Description'}</small>
          </div>
          <textarea
            placeholder={updatedata ? null : 'Enter Description'}
            classname="form-control"
            rows="3"
            style={{ width: '70%' }}
            defaultValue={!updatedata ? null : des}
            onChange={(e) => setDes(e.target.value)}
          ></textarea>
        </div>
      </div>
      <hr />
      <div className="text-center">
        <button
          className={updatedata ? 'btn btn-primary' : 'btn btn-success'}
          onClick={() => {
            data ? edit() : create();
          }}
        >
          {updatedata ? 'Save' : 'Create'}
        </button>
        &nbsp;
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch(getPosts())
            back();
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Createpost;
