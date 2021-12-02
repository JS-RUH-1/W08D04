 
  import {  useState } from "react";
  import { useNavigate } from "react-router-dom";
  import {Link} from 'react-router-dom'
  import './sign.css'
  import axios from 'axios'
  import swal from 'sweetalert';
  export default function Sign () {

    const navigate=useNavigate()

    const [author,setAuthor]=useState([]);
    const [newAuthor,setNewAuthor]= useState({});

    const [Name,setName]=useState()
    const [Age,setAge]=useState()
    const [Nationality ,setNationality] =useState()
    const [Image,setImage] = useState()
    const [Gender ,setGender] = useState()
    const [Email,setEmail]=useState()
    const [Password,setPassword]=useState()

////////////////////////////////

    const handelSing=(e)=>{ 

    e.preventDefault()

    axios.post('http://localhost:3030/authors/create' ,
    { name:Name , age:Age ,email:Email, nationality:Nationality ,image:Image, gender:Gender, password:Password })


    .then((res)=>{

    console.log(res)

    if(res.data.error === "Email is taken"){
        
         
        swal({
            title:'This email is already taken,please try again .',
            icon:'error'
          })
    }
    else{
        setNewAuthor(res.data)
        swal({
            title:'Welcome .'+Name,
            icon:'success'
          })
        navigate('/Author');
    }
     
  
})
 
  
 
}



     return ( <>

                <form className="signForm">
                        <h3>SignUp</h3>
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

                        <input type="nationality" name="nationality"
                        placeholder='What is your Nationality.'
                        onChange={e=>setNationality(e.target.value)}/>
                        <br/>

                        <input type="text" name="image"
                        placeholder='Can you give us your image.'
                        onChange={e=>setImage(e.target.value)}/>
                        <br/>
                        
                        <input type="text" name="gender"
                        placeholder='Enter Your gender.'
                        onChange={e=>setGender(e.target.value)}/>
                        <br/>
                        {/* <label>Password :</label> */}
                        <input type="password" name="password"
                        placeholder='Enter Your Password.'
                        onChange={e=>setPassword(e.target.value)}/>                         
                        <br/>
                        <button  className='SUBMIT' onClick={(e)=>handelSing(e)}>Sign In</button>
                        <h4>I have account
                            <Link to={`Login`}> Login</Link>

                        </h4>
             </form>
     </> );
 }
 
  