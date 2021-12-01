 //form of author name
 //add new author 
 //delete author 
 //edit author 
 import { useEffect, useState } from "react";
 import swal from 'sweetalert';
 import {Link} from 'react-router-dom'

 import axios from 'axios';
 import './author.css'

export default function Author() {

    const [author,setAuthor]=useState([]);
    const [newAuthor,setNewAuthor]= useState({});

     
     

    

    ///////////////////////
    //add author ****************
//show all authors
    useEffect(()=>{

         axios.get('http://localhost:3030/authors')
        .then((res)=>{
            console.log(res.data)
            setAuthor(res.data)
        })

    },[newAuthor])
    ////////////////////////////////////////////////////////////////////////
      

    return (  
        <>
 
 

    <div className="authorBox">
 
     {author.map((get)=>{

 return <div className="authorCard">
 
     <img src={get.image} alt='' width={200}/>
     <br></br>
     <Link to={`/Author/${get._id}`}> see more</Link>
                     


 <div className="BTN">

   
</div>
</div>
             })}


         </div>
        </>
    );
}

   