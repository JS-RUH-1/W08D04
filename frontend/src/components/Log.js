    
     import {Link} from 'react-router-dom'
     import {  useState } from "react";
     import { useNavigate } from "react-router-dom";
     import jwt from "jwt-decode"
     import axios from 'axios'




  export default  function Log () {
    const navigate=useNavigate()
    const [Email,setEmail]=useState()
    const [Password,setPassword]=useState()


const handelLogin=(e)=>{

    e.preventDefault()

    axios.post('http://localhost:3030/authors/login' ,
    { email:Email ,password:Password })
    
    .then((res)=>{

        console.log(res.data)
    
        if(res.data.success === true){
            
        const token = res.data.token;
        const authorSign = jwt(token); // decode your token here
        console.log(token)
        console.log(authorSign)
        localStorage.setItem("token", token);

            alert('Welcom '+" "+Email)
            navigate('/Author');
        }
        else{
            alert('Your password or email is incorrect,try again')
        }
    })}


        return ( 
         <>
        <h3>Login page</h3>



        <form className="signForm">
                        <h3>LogIn</h3>
                        

                
                        {/* <label>Email :</label> */}
                        <input type="email" name="email"
                        placeholder='Enter Your Email.'
                        onChange={e=>setEmail(e.target.value)}/>
                        <br/>

                        {/* <label>Password :</label> */}
                        <input type="password" name="password"
                        placeholder='Enter Your Password.'
                        onChange={e=>setPassword(e.target.value)}/>                         
                        <br/>


                        <button  className='SUBMIT' onClick={(e)=>handelLogin(e)}>Log In</button>
                        <h4>I have account
                            <Link to={`/`}>Signin</Link>

                        </h4>
             </form>
        </>
        );
    }

      