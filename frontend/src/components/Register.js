import React from "react";
import { useEffect } from "react";
import Axios from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const signUser = (e) => {
    console.log(password);
    // e.preventDefault();
    // console.log(e.target.form[1].value);

    // Axios.post("http://localhost:8080/user/signup",
    //   { username: e.target.form[0].value , password: e.target.form[1].value});

     Axios.post("http://localhost:8080/user/signup", {
        username: username,
        password: password,
      })
        .then((res) => {
          console.log("res", res.data);
          // localStorage.setItem("token", res.data);
          navigate('../login', {replace:true})
          //const status = res.data == 'Success' ? log.setLogged(true) : log.setLogged(false);
        })
        .catch((err) => {
          console.log("Error");
        });
  };

  return (
    <div>
      <section className="vh-100">
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
                {/* <!-- Email input --> */}
                <h1>Sign up</h1> <br></br>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label className="form-label" for="form3Example3" >
                    Username
                  </label>
                </div>
                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" for="form3Example4">
                    Password
                  </label>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={(e) => signUser(e)}
                  >
                    Signup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
