import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateLoginToken } from "../reducers/login";

function Login() {
  const [user, setUser] = useState([]);
  const [errorMsg, setErrorMsg] = useState(["", ""]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return { token: state.token.loginToken };
  });
  useEffect(() => {
    console.log("state dot token", state);
  }, []);
  let handleSubmit = (e) => {
    setErrorMsg(["", ""]);
    e.preventDefault();
    console.log("email", e.target[0].value, "password", e.target[1].value);
    let errString = "Enter a valid ";
    if (e.target[0].value == "")
      errString == "Enter a valid "
        ? (errString += "email ")
        : (errString += "and email ");
    if (e.target[1].value == "")
      errString == "Enter a valid "
        ? (errString += "password ")
        : (errString += "and password ");

    if (errString != "Enter a valid ") {
      alert(errString);
      return;
    }

    axios
      .post("http://localhost:8000/backend/authors/Login", {
        email: e.target[0].value,
        password: e.target[1].value,
      })
      .then((res) => {
        console.log("errorMsg", errorMsg);
        if (res.data[0] === "errors") {
          // for (let i = 0; i < res.data.slice(1).length; i++) {
          //     if(res.data.slice(1)[i].path=='name')
          //     setErrorMsg([res.data.slice(1)[i].message,...errorMsg.slice(1)]);
          //     if(res.data.slice(1)[i].path=='email')
          //     setErrorMsg([errorMsg[0],res.data.slice(1)[i].message,...errorMsg.slice(2)]);
          //     if(res.data.slice(1)[i].path=='password')
          //     setErrorMsg([...errorMsg.slice(0,2),res.data.slice(1)[i].message,...errorMsg.slice(3)]);
          //     if(res.data.slice(1)[i].path=='nationality')
          //     setErrorMsg([...errorMsg.slice(0,3),res.data.slice(1)[i].message,...errorMsg.slice(4)]);
          //     if(res.data.slice(1)[i].path=='image')
          //     setErrorMsg([...errorMsg.slice(0,4),res.data.slice(1)[i].message,...errorMsg.slice(5)]);
          //     if(res.data.slice(1)[i].path=='age')
          //     setErrorMsg([...errorMsg.slice(0,5),res.data.slice(1)[i].message,errorMsg[6]]);
          //     if(res.data.slice(1)[i].path=='gender')
          //     setErrorMsg([...errorMsg.slice(0,6),res.data.slice(1)[i].message]);
          // }
        }
        console.log("errorMsg", errorMsg);
        setUser([e.target[0].value, e.target[1].value]);
        console.log("res.data is:", res.data);
        window.localStorage.setItem("author_token", res.data.author_token);
        dispatch(updateLoginToken(window.localStorage.getItem('author_token')))
        navigate('/')
      })
      .catch((err) => {
        console.log("(Error catched at sign up):", err);
        console.log(err);
        // let errClone = errorMsg;
        // err?.forEach((e,i)=>e.path=='name'?setErrorMsg(errClone.splice(0,1,e)):
        // e.path=='email'?setErrorMsg(errClone.splice(1,1,e)):
        // e.path=='password'?setErrorMsg(errClone.splice(2,1,e)):
        // e.path=='nationality'?setErrorMsg(errClone.splice(3,1,e)):
        // e.path=='image'?setErrorMsg(errClone.splice(4,1,e)):
        // e.path=='age'?setErrorMsg(errClone.splice(5,1,e)):
        // e.path=='gender'?setErrorMsg(errClone.splice(6,1,e)):"")
        // console.log(errorMsg)
      });
  };
  return (
    <div className="body">
      <div className="center">
        <h2>Log in</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputbox">
            <input type="text" id="email" name="email" />
            <span>Email</span>
          </div>
          <div className="error_message">{errorMsg[1]}</div>
          <div className="inputbox">
            <input type="text" id="password" name="password" />
            <span>Password</span>
          </div>
          <div className="error_message">{errorMsg[2]}</div>
          <br />
          <div className="inputbox">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <div className="wave">
          <img stc="../images/wave.svg" alt=""/>
      </div>
    </div>
  );
}
export default Login;
