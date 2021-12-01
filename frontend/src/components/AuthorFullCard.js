 import React, { useEffect ,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";

import swal from 'sweetalert';
import axios from "axios";



export default function AuthorFullCard({data}) {

    const {_id} =useParams();
    const [newAuthor,setNewAuthor]= useState({});
    const navigate=useNavigate()


    useEffect(()=>{
        console.log(_id)
    })

    ////////////////////////////////////////////////////////////////
    const handelDelete=(id)=>{ 

      swal({
          title:'Author is deleted ',
          icon:'success'
        })
              console.log(id)
  
      axios.delete(`http://localhost:3030/authors/${id}/delete`)
      .then((res)=>{
          
          setNewAuthor(res.data)
      })
      navigate('/components/Author');
          }

    return (
        <>

      <section className='full'>
          <div className='children'>

        {data.filter(card=>card._id ===_id)
        .map((card,index)=>(

        <div key={index} className='fullCard'>

        <div className='fullImage'>
        <img src={card.image} alt='' width={300}/>

        </div>

    <div className='fullInfo'>
      <h1> Name of Author: <span>{card.name}.</span> </h1>             
                            <br/>
      <h1> Age of Author:<span>{card.age}.</span> </h1>
                            <br/>
     <h1> Nationality is:<span>{card.nationality}.</span> </h1>


        <hr></hr>
        
<div className='bookInfo'>
<h2>About the Book</h2>
        {card.books.map((item)=>{
            return  <div>
            <p><span>title of book:</span>{item.title}</p>
            <p><span>page of book:</span>{item.pages}</p>
            <p><span>price of book:</span>{item.price}</p>
            <img src={item.image} alt='' width={200}/>

        </div>
        })}
        </div>
     <div className="BTN">

        <button className='btnDE' onClick={()=>handelDelete(card._id)}>Delete</button> 
        {/* <button className='btnEDIT' onClick={()=>handelEdit(get._id)}>Edite</button>  */}
                
                </div>
                </div>

 </div >
            
        ))}

          </div>
      </section>
        </>
      );
}

 