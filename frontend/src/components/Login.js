import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Login() {
  const navigate = useNavigate();
  const [authorData, setAuthorData] = useState({});

  function loginCheck() {
    if (authorData.email == null || authorData.password == null) {
      alert("There is Data Messing");
      return;
    }
    axios
      .post("http://localhost:8080/authors/login", authorData)
      .then((res) => {
        if (res.data !== "Invalid Email or Password") {
          localStorage.setItem("token", res.data);
          Swal.fire({
            title: "You are logged in successfully",
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didClose: () => {
              navigate("/books");
            },
          });
        } else {
          alert("Invalid Email or Password");
        }
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto mt-24 inset-0  ">
        {/*content*/}
        <div className="border-0  rounded-lg shadow-lg relative flex flex-col   w-1/2  bg-white outline-none focus:outline-none">
          <form
            className="relative p-6 flex-auto"
            onSubmit={(e) => {
              e.preventDefault();
              loginCheck();
            }}
          >
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-darkblue text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                type="email"
                onChange={(e) => {
                  authorData.email = e.target.value;
                  setAuthorData({ ...authorData });
                }}
                className="border-0 px-3 py-3 placeholder-graylight  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                placeholder="Email"
                style={{ transition: "all .15s ease" }}
              />
            </div>

            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-darkblue text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                type="password"
                onChange={(e) => {
                  authorData.password = e.target.value;
                  setAuthorData({ ...authorData });
                }}
                className="border-0 px-3 py-3 placeholder-graylight bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                placeholder="Password"
                style={{ transition: "all .15s ease" }}
              />
            </div>

            <div className="text-center mt-6">
              <button
                className=" bg-pink-500 text-white  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-orang2 outline-none focus:outline-none mr-1 mb-1 w-full"
                type="submit"
                style={{ transition: "all .15s ease" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
