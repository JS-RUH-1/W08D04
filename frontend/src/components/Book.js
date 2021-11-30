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

    const [Image ,setImage] =useState()
    const [Title,setTitle]=useState()
    const [Pages,setPages]=useState()
    const [Price,setPrice]=useState()
        


// ///////////////////////////////////
//display all data from database
    useEffect(()=>{ 
    
    axios.get('http://localhost:3030/books')
    .then((res)=>{
        setBook(res.data)
    })
    },[newBook])

    // //////////////////////////////////
//add new info about  book
    const handelAdd=()=>{ 

        swal({
            title:'Added New Book',
            icon:'success'
          })

        axios.post('http://localhost:3030/books/create', 
        {image:Image, title:Title, pages:Pages, price:Price }
        )
        
        .then((res)=>{

            console.log(res.data)
            setNewBook(res.data)
            
            // console.log(newBook)

            // setBook(newBook)
        })
    }

  
     const handelEdit=(id)=>{ 

        swal({
            title:`you edit a appointment in card ${id}`,
            icon:'success'
          })

        axios.put(`http://localhost:3030/books/${id}/update`,
        {image:Image, title:Title, pages:Pages, price:Price }
        )
        .then((res)=>{
            console.log(res.data)
            setNewBook(res.data)
        })
     }
     ///////////////////////////////

    return (  
        <>
     

<from >


<div className="bookForm"> 
 <h2> Add new Book</h2>
<label>Image:</label>
<input type="text"
 placeholder="Enter Cover of book .."
 onChange={e=>setImage(e.target.value)}/>
<br>
</br>

<label>Title:</label>
<input type="text"
 placeholder="Enter name of title .."
 onChange={e=>setTitle(e.target.value)}/>
<br>
</br>

<label>Pages:</label>
<input type="text"
 placeholder="Enter number of pages .."
 onChange={e=>setPages(e.target.value)}/>
<br>
</br>

<label>Price:</label>
<input type="text"
 placeholder="Enter the price .."
 onChange={e=>setPrice(e.target.value)}/>
<br>


</br>

 <button onClick={handelAdd}> Add</button>
</div>
</from>



        <div className="bookBox">

{/* display all data from database */}
        {
        book.map((get) => {
             return <div className="bookCard">

              <br></br>

              <img src={get.image} alt="" width={250} />
             <Link to={`/Book/${get.title}`}>
             see more </Link>
             <br></br>

             
           <div className="BTN">
        <button className='btnEDIT' onClick={()=>handelEdit(get._id)}>Edite</button> 
                </div>
             
             </div>;

              
})}

        </div>
        </>
    );
}

   