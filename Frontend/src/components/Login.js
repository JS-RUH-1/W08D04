import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import './log.css'
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";


export default function Login (){

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    let navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login',{
            email: email,
            password: password,
        }).then((response) => {
            console.log(response);
            
            if(response.data.errors){

            }
            if(response.data.user){
                const token = response.data.token;
                const userSign = jwt(token);
                console.log(token);
                console.log(userSign);
                localStorage.setItem('token',token);
                navigate("/")
                alert("Login successfully")
            }

           });
    }
    return (
        <div>

         <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="registerModalLabel">Login</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
          <div class="modal-body">
             <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input onChange = {(e)=> {setEmail(e.target.value)}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input onChange = {(e)=> {setPassword(e.target.value)}} type="password" class="form-control" id="exampleInputPassword1"></input>
                <small>Don't have an account? 
                 <Link on to={{ pathname: `/Sign` }}>
                            <p className="d-inline text-primary">Sign Up</p></Link></small>
            </div>
            </div>
            <div class="modal-footer">
            <button type="submit" class="btn btn-primary" onClick = {(e)=>{login(e)}}>Login</button>

            </div>
         </div>
         </div>
         </div>

      
    )
}