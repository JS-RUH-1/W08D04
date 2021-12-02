import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import {  Link  } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import jwt from "jwt-decode"

function Signup() {



    const [author , setAuthor]=useState([]);
    const [addName, setAddName] =useState ('')
    const [addAge, setAddAge] =useState ('')
    const [addNat, setAddNat] =useState ('')
    const [addImg, setAddImg] =useState (null)
    const [addGender, setAddGender] =useState ('')
    const [addEmail,setAddEmail]=useState('')
    const [addPassword,setAddPassword]=useState('')

    
    let navegate = useNavigate()
    
    useEffect (() =>{
        axios.get('http://localhost:3001/api/author/home')
        .then((res)=>{
            console.log(res);
            setAuthor(res.data);
        })
        },[]);
    
        function handlPost(e){
            e.preventDefault()
            axios.post('http://localhost:3001/signup' , {
                image:addImg ,
                name: addName ,
                age:addAge ,
                nationality:addNat ,
                gender:addGender ,
                email :addEmail,
                password:addPassword
    
            })
            .then((res) => {
                console.log(res.data);
                setAuthor(res.data);
                if (res.data.user) {
                    console.log(res.data)
                    const token = res.data.token;
                    // const authorSign = jwt(token); // decode your token here
                    console.log(token)
                    // console.log(authorSign)
                    localStorage.setItem("token", token);
                    navegate(`/Details/${res.data.user}`);
                  }
                
            })
        }

       
    // ________________________________________________________

    return (  
        <div>
           <div className="form1">
            <h2> Sign up</h2>
        <input placeholder="Your Name" onChange ={(e)=> setAddName(e.target.value)}type="text" name="title"></input><br/>
        <br/>
        <input placeholder="Your Age" onChange ={(e)=> setAddAge(e.target.value)}type="text" name="title"></input><br/>
        <br/>
        <input placeholder="Your nationality" onChange ={(e)=> setAddNat(e.target.value)}type="text" name="title"></input><br/>
        <br/>
        
             <input
        placeholder="Your Imge"
        onChange={(e) => setAddImg(e.target.value)}
        type="text"
        name="title"
      />
        <br/><br/>
        <input placeholder="Your gender" onChange ={(e)=> setAddGender(e.target.value)}type="text" name="title"></input><br/>
      <br/>
      <input placeholder="Your Email" onChange ={(e)=> setAddEmail(e.target.value)}type="text" name="title"></input><br/>
<br/>
     <input placeholder="Password" onChange ={(e)=> setAddPassword(e.target.value)}type="password" name="password" required></input><br/>

      
<br/>
<div>
    
</div>
      <button onClick={(e)=>handlPost(e)} style = {{backgroundColor: "black" ,color: "White"}}>Sign up </button>
        </div>
            
        </div>
    );
}

export default Signup ;