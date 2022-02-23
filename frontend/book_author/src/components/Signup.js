import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLoginToken } from "../reducers/login"

function Signup() {
  const [user, setUser] = useState([]);
  const [errorMsg, setErrorMsg] = useState(["","","","","",""]);
  const state = useSelector((state) => {
    return { token: state.token.loginToken };
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(()=>{
  //   state.token?'':""
  // },[])
  let handleSubmit = (e) => {
      setErrorMsg(["","","","","",""])
    e.preventDefault();
    let errString = "Enter a valid ";
        if(e.target[0].value=="")
        errString == "Enter a valid "?errString += "name ":errString += "and name "
        if(e.target[1].value=="")
        errString == "Enter a valid "?errString += "email ":errString += "and email "
        if(e.target[2].value=="")
        errString == "Enter a valid "?errString += "password ":errString += "and password "
        if(e.target[3].value=="")
        errString == "Enter a valid "?errString += "nationality ":errString += "and nationality "
        if(e.target[4].value=="")
        errString == "Enter a valid "?errString += "image ":errString += "and image "
        if(!e.target[5].value.split('').every((e)=>e.charCodeAt(0)>47&&e.charCodeAt(0)<58))
        errString == "Enter a valid "?errString += "age ":errString += "and age "
        
        if(errString != "Enter a valid "){
        alert(errString)
        return;
        }
        
    axios
      .post("http://localhost:8000/backend/authors/SignUp",
      {
          name:e.target[0].value,
          email:e.target[1].value,
          password:e.target[2].value,
          nationality:e.target[3].value,
          image:e.target[4].value,
          age:parseInt(e.target[5].value),
          gender:e.target[6].value } )
      .then((res) => {
        console.log("errorMsg",errorMsg)
        if(res.data[0]==='errors'){
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
        console.log("errorMsg",errorMsg)
          setUser([e.target[0].value, e.target[1].value]);
          console.log("res.data is:",res.data);
          window.localStorage.setItem("author_token",res.data.author_token)
          dispatch(updateLoginToken(window.localStorage.getItem('author_token')))
          navigate('/')
      })
      .catch((err) => {
        console.log("(Error catched at sign up):", err);
        console.log(err)
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
        <h2>Sign Up</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputbox">
              <input
                type="text"
                id="name"
                name="name"
              />
              <span>Name</span>
          </div>
            <div className="error_message">{errorMsg[0]}</div>
          <div className="inputbox">
              <input
                type="text"
                id="email"
                name="email"
              />
              <span>Email</span>
          </div>
          <div className="error_message">{errorMsg[1]}</div>
          <div className="inputbox">
              <input
                type="text"
                id="password"
                name="password"
              />
            <span>Password</span>
          </div>
          <div className="error_message">{errorMsg[2]}</div>
          <div className="inputbox">
              <input
                type="text"
                id="Nationality"
                name="Nationality"
              />
              <span>Nationality</span>
          </div>
          <div className="error_message">{errorMsg[3]}</div>
          <div className="inputbox">
              <input
                type="text"
                id="image"
                name="image"
              />
              <span>Image URL</span>
          </div>
          <div className="error_message">{errorMsg[4]}</div>
          <div className="inputbox">
              <input
                type="text"
                id="age"
                name="age"
              />
              <span>Age (Optional)</span>
          </div>
          <div className="error_message">{errorMsg[5]}</div>
          <div className="inputbox">
              <input
                type="text"
                id="gender"
                name="gender"
              />
            <span>Gender (Optional)</span>
          </div>
          <div className="error_message">{errorMsg[6]}</div>
          <br />
          <div className="inputbox">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
