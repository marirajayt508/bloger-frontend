import React from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ name, admin, edit }) => {
  const navigate = useNavigate();
  const logout = ()=>{
    sessionStorage.removeItem('aut')
    navigate("/")
  }
  return (
    <nav class="navbar navbar-light bg-dark p-3">
      <div><span style={{"border-radius" : "100%"}} className='bg-info text-light p-3 m-3'>{name.charAt(0).toUpperCase()}</span>
      <span class="navbar-brand mb-0 h1 text-light">{name.toUpperCase()}</span>
      </div>

      <button className="btn btn-danger" onClick={()=>{logout()}}>Signout</button>
    </nav>
  );
};

export default Navbar;
