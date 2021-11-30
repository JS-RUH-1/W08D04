 
  import {  useState } from "react";
  import { useNavigate } from "react-router-dom";
  import {Link} from 'react-router-dom'
 import './sign.css'
 import axios from 'axios'
 export default function Sign () {

    const navigate=useNavigate()
// const [user,setUser]=useState([])

const [Name,setName]=useState()
const [Age,setAge]=useState()
const [Email,setEmail]=useState()
const [Password,setPassword]=useState()

////////////////////////////////

    const handelSing=(e)=>{ 
    e.preventDefault()
    axios.post('http://localhost:3030/users/create' ,
    { name:Name , age:Age ,email:Email ,password:Password })

    .then((res)=>{

    console.log(res)

    if(res.data.error === "Email is taken"){
        
        alert('This email is already taken')
    }
    else{
        navigate('/components/Book');
    }
     
    //  setUser(res.data)
    // console.log("nnnnnooooo")
})
 
  
 
}



     return ( <>

                <form className="signForm">
                        <h3>SignIn</h3>
                        {/* <label>Name :</label> */}
                        <input type="text" name="name"
                        placeholder='Enter Your name.'
                        onChange={e=>setName(e.target.value)}/>
                        <br></br>

                        {/* <label>Age :</label> */}
                        <input type="number" name="age"
                        placeholder='Enter Your Age.'
                        onChange={e=>setAge(e.target.value)}/>
                        <br/>

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
                        <button  className='SUBMIT' onClick={(e)=>handelSing(e)}>Sign In</button>
                        <h4>I have account
                            <Link to={`Login`}>Login</Link>

                        </h4>
             </form>
     </> );
 }
 
  