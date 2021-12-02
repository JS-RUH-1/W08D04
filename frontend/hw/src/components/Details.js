import { useState, useEffect } from "react";
import "../App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useParams , useNavigate} from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Details() {
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


  let navegate =useNavigate()  

  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const [author, setAuthor] = useState();
  console.log(id);
// 
  const [addName, setAddName] = useState ('')
  const [addAge, setAddAge] = useState ('')
  const [addNat, setAddNat] = useState ('')
  const [addImg, setAddImg] = useState (null)
  const [addGender, setAddGender] = useState ('')
  const [enableEdit,setEnabeEdit] = useState(false)
  const [idUpdate,setIdUpdate] = useState()

  // ___________________________________________________________________

  const [Book , setBook]=useState([]);
  const [addTitle, setAddTitle] = useState ('')
  const [addPages, setAddPages] = useState ('')
  const [addPrice, setAddPrice] = useState ('')
  const [addImgBook, setAddImgBook] = useState (null)

  useEffect(() => {
    axios.get(`http://localhost:3001/api/author/details/${id}`).then((res) => {
      console.log(res.data);
      setAuthor(res.data);
      setLoading(false);
    });
  }, []);

// _________________________________________________________ delet book
   
const deleteBook = (e,_id) => {
  e.preventDefault()
  console.log(_id)
  axios.delete(`http://localhost:3001/books/book/${id}/${_id}`).then((response) => {
  console.log(" deleted: ", response.data)
  navegate('/')
})
}

// ___________________________________________________________________update book
function editBook(e,_id){
  setIdUpdate(_id)
  setEnabeEdit(true)

}


function updateBook (e,_id){
  e.preventDefault()
  console.log(_id)
  axios.put(`http://localhost:3001/books/bookUpdate/${id}/${_id}`, {
    image:addImgBook ,
    title: addTitle,
    pages:addPages ,
    price:addPrice ,
    
}).then((res)=>{
    console.log(res.data)
    setAuthor(res.data)
  })
  setEnabeEdit(false)
}

     
    {/* ___________________________________________________________________________________- */}


  function handlPost(e){
    e.preventDefault()
            axios.post(`http://localhost:3001/books/book/${id}` , {
                image:addImgBook ,
                title: addTitle,
                pages:addPages ,
                price:addPrice ,
                
            })
            .then((res) => {
                console.log(res.data);
                setAuthor(res.data);
            })
        }
// ________________________________________________________________________update author
function editAuthor(e,_id){
  setIdUpdate(_id)
  setEnabeEdit(true)

}
        function handlUpdate(e){
          e.preventDefault()
                  axios.put(`http://localhost:3001/api/author/update/${id}` , {
                    image:addImg ,
                    name: addName ,
                    age:addAge ,
                    nationality:addNat ,
                    gender:addGender ,
                      
                  })
                  .then((res) => {
                      console.log(res.data);
                      setAuthor(res.data);
                  })
                  setEnabeEdit(false)
              }

              //______________________________________________________ Delete author
    const deleteAuther = (e,_id) => {
      e.preventDefault()
      console.log(_id)
      axios.delete(`http://localhost:3001/api/author/delete/${_id}`).then((response) => {
      console.log(" deleted: ", response.data)
      setAuthor(response.data);
  })
 }
              // _______________________________________________________________

 

  if (loading) {
    return (<p>loading...</p>);
  }
{/* ______________________________________اذا مسجل دخول يظهر له ____ */}
  const decode =()=>{
    if (decodedData != undefined){
      if(decodedData.id==id){
        return(
          <>
           <button onClick={(e)=>editAuthor(e,id)} style = {{backgroundColor: "black" ,color: "White"}}> Update</button>
                            </>
        )
      }
    }
  }

  // _______________________________________2___________
  // const decode1 =()=>{
  //   if (decodedData != undefined){
  //     if(decodedData.id==id){
  //       return(
  //         <>
  //          <button onClick={(e)=>editBook(e,id)} style = {{backgroundColor: "black" ,color: "White"}}> Add Book</button>
  //                           </>
  //       )
  //     }
  //   }
  // }
  // _______________________________________-3______________
  const decode2 =()=>{
    if (decodedData != undefined){
      if(decodedData.id==id){
        return(
          <>
           <button style = {{backgroundColor: "black" ,color: "White"}} onClick={(e) =>
                            {deleteAuther(e,author._id)}}>Delete</button> 
                            </>
        )
      }
    }
  }

  return (
    <div className="maindiv">
      {/* _______________________________form update auhtor__________________ */}

      <div>
        <>
      {(function(){
        if (enableEdit==true){
          return(
            <form>
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
        <button onClick={(e)=>{handlUpdate(e)}}>Save</button>
        </form>
            
          )
        }
      })()}
        
        </>
    
      
      </div>
    {/* __________________________________________________ */}
      {console.log(author)}
      <img src={author.image} className="photo"/>
      <h3>Name: {author.name}</h3>
      <h5>Age: {author.age}</h5>
      <h4>Nationality: {author.nationality}</h4>
      {decode()}
      {/* {decode1()} */}
      {decode2()}
{/* __________________________________________________________ */}

      {author.books?.map((item) => {
        return (
          <div className="divmore">
            <img src={item.image} />
            <h2>{item.title}</h2>
            <h5>{item.pages} Pages</h5>
            <h4>{item.price} SR</h4>
    {(function(){
  if(decodedData!=undefined){
    console.log(decodedData)
    console.log(decodedData.id)
    if(decodedData.id==id){
      return(
        <>
        <button  onClick={(e)=>deleteBook(e,item._id)}> Delete</button>
        <button onClick={(e)=>updateBook(e,item._id)} style = {{backgroundColor: "black" ,color: "White"}}> Update</button>
        </>
      )
    }
  }
})()}
           
          </div>
        );
      })}

{(function(){
  if(decodedData!=undefined){
    console.log(decodedData)
    console.log(decodedData.id)
    if(decodedData.id==id){
      return(
        
      <div>
      <input placeholder="Title" onChange ={(e)=> setAddTitle(e.target.value)}type="text" name="title"></input><br/>
        <br/>
        <input placeholder="Pages" onChange ={(e)=> setAddPages(e.target.value)}type="text" name="title"></input><br/>
        <br/>
        <input placeholder="Price" onChange ={(e)=> setAddPrice(e.target.value)+"SR"}type="text" name="title"></input><br/>
        <br/>
        
        
             <input
        placeholder="Imge"
        onChange={(e) => setAddImgBook(e.target.value)}
        type="text"
        name="title"
      />
      <br/>

      <button onClick={(e)=>{handlPost(e)}} style = {{backgroundColor: "black" ,color: "White"}}>Save </button>
            {/* {decode1()} */}
       <br/>
            
      </div>
         
      )
    }
  }
})()} 
      
    </div>
  );
}
export default Details;
