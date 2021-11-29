import React from "react";
import Axios from "axios";

const Login = () => {
    
    const logUser = (e) => {
        e.preventDefault();
        //ADDED
        // console.log(e.target.form[1].value);
    
        Axios
          .get("http://localhost:8080/user", {
            username: e.target.form[0].value,
            password: e.target.form[1].value,
          })
          .then((res) => {
            // if(res.data !== undefined){
            //   log.setLogged(true)
            //   dispatch(addUser(res.data))
            //   console.log('res',res.data)
            // }
            console.log(res)
            
            //const status = res.data == 'Success' ? log.setLogged(true) : log.setLogged(false);
    
          });
      };

  return (
    <div>
      <section class="vh-100">
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
                

                <br></br><br></br><br></br><br></br>

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
                  <button type="button" class="btn btn-primary btn-lg" onClick={(e) => logUser(e)}>
                    Login
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
      </section>
    </div>
  );
};

export default Login;
