import { useState, useEffect } from "react";
import "../App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function Details() {

  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const [author, setAuthor] = useState();
  console.log(id);

  const [Book , setBook]=useState([]);
  const [addTitle, setAddTitle] = useState ('')
  const [addPages, setAddPages] = useState ('')
  const [addPrice, setAddPrice] = useState ('')
  const [addImg, setAddImg] = useState (null)

// _________________________________________________________ Update


  function handlPost(e){
    e.preventDefault()
            axios.post(`http://localhost:3001/books/book/${id}` , {
                image:addImg ,
                title: addTitle,
                pages:addPages ,
                price:addPrice ,
                
            })
            .then((res) => {
                console.log(res.data);
                setAuthor(res.data);
            })
        }

        function handlUpdate(e){
          e.preventDefault()
                  axios.post(`http://localhost:3001/api/author/update/${id}` , {
                      image:addImg ,
                      title: addTitle,
                      pages:addPages ,
                      price:addPrice ,
                      
                  })
                  .then((res) => {
                      console.log(res.data);
                      setAuthor(res.data);
                  })
              }

  

  useEffect(() => {
    axios.get(`http://localhost:3001/api/author/details/${id}`).then((res) => {
      console.log(res.data);
      setAuthor(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (<p>loading...</p>);
  }
  return (
    <div className="maindiv">
      {console.log(author)}
      <img src={author.image} className="photo"/>
      <h3>Name: {author.name}</h3>
      <h5>Age: {author.age}</h5>
      <h4>Nationality: {author.nationality}</h4>
      {author.books?.map((item) => {
        return (
          <div className="divmore">
            <img src={item.image} />
            <h2>{item.title}</h2>
            <h5>{item.pages} Pages</h5>
            <h4>{item.price} SR</h4>
          </div>
        );
      })}
      <div>
      <input placeholder="Title" onChange ={(e)=> setAddTitle(e.target.value)}type="text" name="title"></input><br/>
        <br/>
        <input placeholder="Pages" onChange ={(e)=> setAddPages(e.target.value)}type="text" name="title"></input><br/>
        <br/>
        <input placeholder="Price" onChange ={(e)=> setAddPrice(e.target.value)}type="text" name="title"></input><br/>
        <br/>
        
             <input
        placeholder="Your Imge"
        onChange={(e) => setAddImg(e.target.value)}
        type="text"
        name="title"
      />
      <br/>

             <button onClick={(e)=>handlPost(e)} style = {{backgroundColor: "black" ,color: "White"}}>Add </button>
             <br/>
             <button onClick={(e)=>handlUpdate(e)} style = {{backgroundColor: "black" ,color: "White"}}> Update</button>
      </div>
    </div>
  );
}
export default Details;
