import React, { useEffect ,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";

import swal from 'sweetalert';
import axios from "axios";



export default function FullCard ({data}){

    const {title} =useParams();
    const [newBook ,setNewBook] = useState({})
    const navigate=useNavigate()


 
useEffect(()=>{
    console.log(title)
})   

 //Delete

 const handelDelete=(id)=>{ 

    swal({
        title:'you deleted a appointment',
        icon:'success'
      })
            console.log(id)
     

    axios.delete(`http://localhost:3030/books/${id}/delete`)
    .then((res)=>{
        
        setNewBook(res.data)
    })
    navigate('/components/Book');
        }

        return(

            <>
             <section className="full">

             <div className="children">

             {data.filter(card => card.title === title)
              .map((card ,index)=>(

        <div key={index} className="fullCard">

    <div className='fullImage'>

    <img src={card.image} alt='' width={300}/>
        
    </div >


            <div className='fullInfo'>
            <h1> Name Of Book: <span>{card.title}.</span> </h1>             
                        <br/>
            <h1> Number of Pages :<span>{card.pages}.</span> </h1>
                        <br/>
            <h1> Price :<span>{card.price}.</span> </h1>

            <div className="BTN">

       <button className='btnDE' onClick={()=>handelDelete(card._id)}>Delete</button> 
       {/* <button className='btnEDIT' onClick={()=>handelEdit(get._id)}>Edite</button>  */}
               
            </div>
            </div>
       
        </div>

    ))}

             </div>

             </section>
             
            </>
        )









}