import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearLoginToken } from "../reducers/login"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  const [book, setBook] = useState({});
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return { token: state.token.loginToken };
  })
  const signOutFunc = () => {
      if(state.token){
          window.localStorage.setItem("author_token","")
          dispatch(clearLoginToken(window.localStorage.getItem('author_token')))
      }
  }
  return (
    <div id="Navbar">
      <h1 className="nav-brand">
        <Link className="nav-item" to="/Home">
          H H H
        </Link>
      </h1>
      <ul>
        <li>
          <Link className="nav-item" to={state.token?"/":"/Login"}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>{state.token?"Welcome":"Log in"}
          </Link>
        </li>
        <li>
          <Link onClick={()=>signOutFunc()} className="nav-item" to={state.token?"/":"/SignUp"}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>{state.token?"Sign out":"Sign Up"}
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Navbar;
