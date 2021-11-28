import React from 'react';
import { Link } from "react-router-dom";

const Nav = () =>{
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
  </div>
  );
}
export default Nav;