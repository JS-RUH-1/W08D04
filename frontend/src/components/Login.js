import React, { useContext } from "react";
import Axios from "axios";
import { useState } from "react";
import { LogContext } from "./LogContext";
import { Link , useNavigate} from "react-router-dom";
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
    //ADDED
    // console.log(e.target.form[1].value);

    Axios.post("http://localhost:8080/user/login", {
      username: e.target.form[0].value,
      password: e.target.form[1].value,
    })
      .then((res) => {
        log.setLogged(true);
        setLogged(true);
        // dispatch(addUser(res.data))
        console.log("res", res.data);
        localStorage.setItem("token", res.data);
        // console.log(log.logged);
        // console.log(logged);

        // console.log(res.status)

        //const status = res.data == 'Success' ? log.setLogged(true) : log.setLogged(false);
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  // useEffect(() => { console.log(logged); }, [logged])

  return (
    <div>

      {token ? 'you are logged in'
      //  navigate('../Book', {replace:true})
      : <section class="vh-100">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
                class="img-fluid"
                alt="Sample image"
              />
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                {/* <!-- Email input --> */}
                <div class="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    class="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                  <label class="form-label" for="form3Example3">
                    Email address
                  </label>
                </div>

                {/* <!-- Password input --> */}
                <div class="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    class="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                  <label class="form-label" for="form3Example4">
                    Password
                  </label>
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    class="btn btn-primary btn-lg"
                    onClick={(e) => logUser(e)}
                  >
                    Login 
                    {log.logged ? <Link to='/book'></Link> : ''}
                    {/* {logged? <Link to="/book"></Link> : ""} */}

                  </button>
                  {/* <p class="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a href="#!" class="link-danger">
                      Register
                    </a>
                  </p> */}
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
