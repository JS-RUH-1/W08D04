 import { useEffect, useState } from "react";
import axios from 'axios'
import './book.css'
import swal from 'sweetalert';
import {Link} from 'react-router-dom'
  

export default function Book(data) {

//    console.log(data)
  
    //all book hear.
    const [book ,setBook] = useState([])
    const [newBook ,setNewBook] = useState({})

    
        
////////////////////////////////////

   


// ///////////////////////////////////
//display all data from database
    useEffect(()=>{ 
    
    axios.get('http://localhost:3030/books')
    .then((res)=>{
        setBook(res.data)
    })
    },[newBook])

    // //////////////////////////////////
 

  
    

    return (  
        <>
     
        <div className="bookBox">

{/* display all data from database */}
        {
        book.map((get) => {
             return <div className="bookCard">

              <br></br>

              <img src={get.image} alt="" width={250} />
             <Link to={`/Book/${get._id}`}>
             see more </Link>
             <br></br>

             
           <div className="BTN">
                 </div>
             
             </div>;

              
})}

        </div>
        </>
    );
}

   