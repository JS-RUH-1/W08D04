import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LogContext } from "./LogContext";

const Navbar = () => {
  const log = useContext(LogContext);

  useEffect(() => {
    console.log(log.logged)
  }, [log.logged])
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand">
            Library
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <Link to="book">Book</Link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                <Link to="author">Author</Link>
                </a>
              </li>
              <li class="nav-item">
                <button  className={log.logged ? "btn btn-success" : "btn btn-dark" }>
                  {" "}
                  <Link className="login" to="/login">
                    Login
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
