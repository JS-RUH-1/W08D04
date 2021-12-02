import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LogContext } from "./LogContext";

const Navbar = () => {
  const log = useContext(LogContext);
  let token = localStorage.getItem("token");

  // useEffect(() => {
  //   console.log(log.logged)
  // }, [token])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">
            Library
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <Link to="book">Book</Link>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                <Link to="author">Author</Link>
                </a>
              </li>
              <li className="nav-item">
                <button  className={token ? "btn btn-danger" : "btn btn-dark" }>
                  {" "}
                  <Link className="login" to="/login">
                    {token ? 'logout' : 'login'}
                  </Link>{" "}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
