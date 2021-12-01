 import React, { useEffect ,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode' 
import swal from 'sweetalert';
import axios from "axios";



export default function AuthorFullCard({data}) {

     const {_id} =useParams();

     const [newBook,setNewBook]= useState({});
     const [Author,setAuthor]= useState([]);

     const navigate=useNavigate()
     const [loading,setLoading]=useState(true);
////////////////////////////////////////////////////////////////
    const [Image ,setImage] =useState()
    const [Title,setTitle]=useState()
    const [Pages,setPages]=useState()
    const [Price,setPrice]=useState()


    useEffect(()=>{

          axios.get(`http://localhost:3030/authors/${_id}`)
         .then((res)=>{
          console.log(res.data.author)
            setAuthor(res.data.author)
            setLoading(false)
})
    },[])


    let decodedData ;

  const storedToken = localStorage.getItem("token");
    if (storedToken){
        decodedData = jwt_decode(storedToken, { payload: true });
        console.log(decodedData);

      let expirationDate = decodedData.exp;
      var current_time = Date.now() / 1000;
      if(expirationDate < current_time)
      {
          localStorage.removeItem("token");
      }
   }

    ////////////////////////////////////////////////////////////////
    const handelDelete=(id)=>{ 

      swal({
          title:'Author is deleted ',
          icon:'success'
        })
              console.log(id)
  
      axios.delete(`http://localhost:3030/books/book/${_id}/${id} `)
      .then((res)=>{
          
        setAuthor(res.data)
      })
      // navigate('/components/Author');
          }


   //add new info about  book
   const handelAdd=(e)=>{ 
       e.preventDefault()
    swal({
        title:'Added New Book',
        icon:'success'
      })

    axios.post(`http://localhost:3030/books/book/${_id}`, 
    {image:Image, title:Title, pages:Pages, price:Price }

    )
    
    .then((res)=>{

        console.log(res.data)
        setAuthor(res.data)
    })
}

if(loading){
  return(<p>Loading </p>);
}


    return (
        <>
        {/* ............. */}

      
      
      {(function() {
        if(decodedData !=undefined){
           if(decodedData.data == _id)
           { return( <from >

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

        <button onClick={(e)=>handelAdd(e)}> Add</button>
        </div>
        </from>)


           }
        }
      })()}
         


      <section className='full'>
          <div className='children'>

        {
         
        (
<>       

       <div  className='fullCard'>

        <div className='fullImage'>
        <img src={Author.image} alt='' width={300}/>
        </div>


     <div className='fullInfo'>

      <h1> Name of Author: <span>{Author.name}.</span> </h1>             
                            <br/>
      <h1> Age of Author:<span>{Author.age}.</span> </h1>
                            <br/>
     <h1> Nationality is:<span>{Author.nationality}.</span> </h1>

     </div>
     </div >

       
        <h2>About the Book</h2>
<div className='bookInfo'>
 

 
        {Author.books.map((item)=>{
            return  <div className='CardInfo'>

              <img src={item.image} alt='' width={200}/>
            <p><span>title of book:</span>{item.title}</p>
            <p><span>page of book:</span>{item.pages}</p>
            <p><span>price of book:</span>{item.price}</p>

            {(function(){
              if(decodedData!=undefined){

                if(decodedData.data == _id)
    {  
    return( <> 
            <button className='btnDE' onClick={()=>handelDelete(item._id)}>Delete</button>
            <button className='btnEDIT' onClick={()=>handelEdit(get._id)}>Edite</button>  
            </>
            ) 
                    }
              }
            })()}
            
        </div>
        })}
        </div>
           <div className="BTN">

                 
                </div>
                

  
           </> 
        )}

          </div>
      </section>
        </>
      );
}

 