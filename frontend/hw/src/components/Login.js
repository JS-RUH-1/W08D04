import { useState } from "react";
import axios from "axios";
import '../App.css';
import { form ,Container, Nav} from 'react-bootstrap';
import jwt from "jwt-decode"
import {useNavigate} from 'react-router-dom'


function Login (){

  let navigate = useNavigate()

    const [author , setAuthor]=useState([]);
    const [addEmail,setAddEmail]=useState('')
    const [addPassword,setAddPassword]=useState('')
    
  
    
        function handlPost(e){
            e.preventDefault()
            axios.post('http://localhost:3001/login' , {
                email :addEmail,
                password:addPassword
    
            })
            .then((res) => {
                console.log(res.data);
                if(res.data.user){
                  const token = res.data.token;
                  // const authorSign = jwt(token); // decode your token here
                  console.log(token)
                  // console.log(authorSign)
                  localStorage.setItem("token", token);
                  
                  navigate("/");

                  setAuthor(res.data);
                }
            })
        }

  
    return(
        <div>
<form className="form1">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input  onChange ={(e)=> setAddEmail(e.target.value)} 
     type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    <div className="email error"></div>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input onChange ={(e)=> setAddPassword(e.target.value)}
    type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required/>
  </div>
  <div className="password error"></div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" onClick={(e)=>handlPost(e)} class="btn btn-primary">Submit</button>
</form>
        </div>
    )
}
export default Login;