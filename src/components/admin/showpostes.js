import React, { useState, useEffect } from 'react';
import Loading from '.././util/loading';
import Viewpost from './viewpost';
import Createpost from './createpost';
import { api } from '../../config';

const Showposted = ({ data, admin, username }) => {
  const [blogspost, setBlogs] = useState([]);
  const [post, findPost] = useState([]);
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editdata, setEditdata] = useState({});
  const [create, setCreate] = useState(false);
  const [viewdata, setViewdata] = useState([]);
  useEffect(() => {
    setBlogs(data.datas);
  });

  const adminRoute = (blogePost) => {
    setEdit(true);
    setEditdata(blogePost);
  };
  const findvalue = (value) => {
    let temp = blogspost.filter((res) => {
      return res.blogname.toLowerCase().includes(value);
    });

    if (value) {
      findPost([...temp]);
    } else {
      findPost([]);
    }
  };

  const viewPage = (status, index) => {
    setView(status);
    setViewdata(blogspost[index]);
  };

  const myView = () => {
    return !view ? (
      <div class="card container p-3">
        <div>
          <strong>All Blogs</strong>
          <span style={{ float: 'right' }}>
            {' '}
            {admin ? (
              <button
                className="btn btn-success"
                style={{ width: '100' }}
                onClick={() => setCreate(true)}
              >
                New Post
              </button>
            ) : null}{' '}
          </span>
        </div>
        <hr />
        <div class="row p-3">
          {blogspost && blogspost.length ? (
            blogspost.map((value, index) => {
              return (
                <div class="col-lg-3 col-md-12 mb-4 mb-lg-0 p-3">
                  <div class="card" style={{ width: '100%' }}>
                    <div class="card-body">
                     
                      <div className="text-center">
                      <h5 class="card-title text-secondary">{value.blogname}</h5><hr/>
                        <img src={api+value.image} style={{ width: '100px' }} />
                             <div>  <hr/> {!admin ? <p><strong>Aurthor</strong> : {value.by}</p>:<p>{value.tagline}</p>}<hr/></div>
                      {admin ? (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            adminRoute(value);
                          }}
                        >
                          Edit
                        </button>
                      ) : null}
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                          viewPage(true,index);
                        }}
                      >
                        View
                      </button>
                      </div>  
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center">
              <small>No Post Found</small>
            </div>
          )}
        </div>
      </div>
    ) : (
      <Viewpost
        view={(value) => {
          setView(value);
        }}
        datas={viewdata}
        admin = {admin}
      />
    );
  };
  const pageContainer = () => {
    const user = () => {
      if (edit) {
        return (
          <Createpost
            updatedata={editdata}
            back={() => {
              setEdit(false);
            }}
            user = {username}
          />
        );
      }
      if (create) {
        return (
          <Createpost
            back={() => {
              setCreate(false);
            }}
            user = {username}
          />
        );
      }
      if (!(edit && create)) {
        return <div>{myView()}</div>;
      }
    };
    return <>{user()}</>;
  };
  const blogs = () => {
    return (
      <>
        <div className="row ">
          <div className="col-md-2 p-3">
            <strong>Find Post</strong>
            <input
              type="text"
              placeholder="Enter Title"
              disabled = { blogspost && blogspost.length ? false : true}
              onChange={(e) => {
                findvalue(e.target.value);
                
              }}
            />
            {post.length ? (
              <div className="p-3">
                <strong>Releated Post</strong>
                <hr />
                {post.map((res, index) => {
                  return (
                    <a
                      className="text-primary"
                      onClick={() => {
                        viewPage(true, index);
                      }}
                    >
                      {res.blogname}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="col-md-10">{pageContainer()}</div>
        </div>
      </>
    );
  };
  return <>{data.loading ? <Loading /> : blogs()}</>;
};

export default Showposted;
