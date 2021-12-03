import React from 'react';
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'


const Nav = () =>{
  let navigate = useNavigate()

  const logout = (e)=>{
    e.preventDefault()
    localStorage.removeItem("token")
    navigate('/')
    alert("Loged out")
  }

  return (
  <div  className="navbar-style">
    <li className="nav">
      <Link to="/" >Home</Link>
    </li>
    <li className="nav">
      <Link to="/Authors" >Authors</Link>
    </li>
    <li className="nav">
      <Link to="/Books" >Books</Link>
    </li>
    <li className="nav">
      <Link to="/Signup" >Signup</Link>
    </li>
    <li className="nav">
      <Link to="/Login" >Login</Link>
    </li>
    <li className="nav">
      <Link to="/logout" ><button onClick={(e)=>logout(e)}>Logout</button></Link>
    </li>
  </div>
  );
}
export default Nav;