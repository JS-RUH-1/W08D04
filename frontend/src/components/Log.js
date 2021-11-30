    
     import {Link} from 'react-router-dom'
     import {  useState } from "react";
     import { useNavigate } from "react-router-dom";






  export default  function Log () {
      
    const [Email,setEmail]=useState()
    const [Password,setPassword]=useState()


const handelLogin=(e)=>{

    e.preventDefault()

    
}


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


                        <button  className='SUBMIT' onClick={(e)=>handelLogin (e)}>Log In</button>
                        <h4>I have account
                            <Link to={`/`}>Signin</Link>

                        </h4>
             </form>
        </>);
    }

      