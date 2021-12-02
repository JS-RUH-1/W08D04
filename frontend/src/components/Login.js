import React, { useContext } from "react";
import Axios from "axios";
import { useState } from "react";
import { LogContext } from "./LogContext";
import { Link , Navigate, useNavigate} from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [logged, setLogged] = useState(false)
  const log = useContext(LogContext);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  const logUser = (e) => {
    log.setLogged(true);  
    console.log(log.logged);
    e.preventDefault();
   
    Axios.post("http://localhost:8080/user/login", {
      username: e.target.form[0].value,
      password: e.target.form[1].value,
    })
      .then((res) => {
        log.setLogged(true);
        setLogged(true);
        console.log("res", res.data);
        localStorage.setItem("token", res.data);
        navigate('../Book', {replace:true})
        //const status = res.data == 'Success' ? log.setLogged(true) : log.setLogged(false);
      })
      .catch((err) => {
        console.log("Error");
      });
  };
 
  return (
    <div>

      {token ?
      <button className="btn btn-danger" onClick={() => localStorage.clear()}>Logout</button>
      //  'you are logged in'
      //  navigate('../Book', {replace:true})
      : <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                  <label className="form-label" for="form3Example3">
                    Email address
                  </label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                  <label className="form-label" for="form3Example4">
                    Password
                  </label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={(e) => logUser(e)}
                  >
                    Login 
                    {log.logged ? <Link to='/book'></Link> : ''}
                    {/* {logged? <Link to="/book"></Link> : ""} */}

                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a  className="link-danger">
                    <Link to='/register'>Register</Link>
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>}
    </div>
  );
};

export default Login;
