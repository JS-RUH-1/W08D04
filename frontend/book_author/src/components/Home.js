
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [allBooks, setAllBooks] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [btn, setBtn] = useState(true);
  const [newValue, setNewValue] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/authors/").then((res) => {
      setAllAuthors(res.data);
      console.log(res.data);
    }).catch(err=>{console.log('error catched at fetching all authors',err)});
    axios.get("http://localhost:8080/books/").then((res) => {
      setAllBooks(res.data);
      console.log(res.data);
    }).catch(err=>{console.log('error catched at fetching all books',err)});
  }, [newValue]);

  let handleSubmit = e =>{
    console.log("onsubmit",e)
    e.preventDefault();
    btn?
    axios.post("http://localhost:8080/authors/",
    {name:e.target[0].value, 
      age:parseInt(e.target[1].value), 
      nationality:e.target[2].value, 
      image:e.target[3].value, 
      gender:e.target[4].value }).then((res) => {
      setNewValue({name:e.target[0].value, 
        age:e.target[1].value, 
        nationality:e.target[2].value, 
        image:e.target[3].value, 
        gender:e.target[4].value })
      console.log(res.data);
    }).catch(err=>{console.log('error catched at posting new author',err)})
    :
    axios.post("http://localhost:8080/books/",
    {title: e.target[0].value,
    pages: parseInt(e.target[1].value),
    price: parseInt(e.target[2].value),
    image: e.target[3].value}).then((res) => {
      setNewValue({title: e.target[0].value,
        pages: e.target[1].value,
        price: e.target[2].value,
        image: e.target[3].value})
      console.log(res.data);
    }).catch(err=>{console.log('error catched at posting new book',err)})
  }

  let handleDelete = e =>{
    console.log('btn',btn)
    console.log("e for delete",e)
    btn?
    axios.delete(`http://localhost:8080/authors/${e._id}`).then((res)=>setNewValue(e)).catch(err=>{console.log('error catched at deleting author',err)})
    :
    axios.delete(`http://localhost:8080/books/${e._id}`).then((res)=>setNewValue(e)).catch(err=>{console.log('error catched at deleting book',err)})
  }
  return (
    
      <header className="App-header">
        <button className={btn ? "btn active" : "btn"}
          onClick={() => (btn ? "" : setBtn(!btn))} >
          Authors
        </button>
        <button className={!btn ? "btn active" : "btn"} onClick={() => (!btn ? "" : setBtn(!btn))} >
          Books
        </button>
        <div>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <label> {btn?"Author name:":"Book title:"} <input type="text"/> </label>
            <br/>
            <label> {btn?"Author Age:":"Number of pages:"} <input type="text"/> </label>
            <br/>
            <label> {btn?"Author nationality:":"price:"} <input type="text"/> </label>
            <br/>
            <label> Image URL: <input type="text"/> </label>
            <br/>
            { btn ? <label> Author gender: <input type="text"/> </label> : "" }
            <br/>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="parent">
          {btn
            ? allAuthors.map((e,i) => {
                return (
                  <div key={e?._id} className="author_card" key={e.id}>
                    <Link style={{textDecoration: 'none',color:'inherit'}} to={`/Author/${e._id}`}><h2>{e?.name}</h2></Link>
                    <h3>{e?.nationality}</h3>
                    <img src={e?.image} />
                    <h3>
                      <span>{e.gender == undefined ? "" : e.gender}</span>
                      <span>
                        {e.age == undefined ? "" : " - " + e.age + " years old"}
                      </span>
                    </h3>
                    <button onClick={()=>handleDelete(e)}>Delete</button>
                  </div>
                  
                );
              })
            : allBooks.map((e, i) => {
                return (
                  <div key={e?._id} className="book_card" >
                    {/* <Link style={{textDecoration: 'none',color:'inherit'}} to={`/Book/${e._id}`}> */}
                        <h2>{e?.title}</h2>
                    {/* </Link> */}
                    <h3>{e?.pages}</h3>
                    <img src={e?.image} />
                    <h3>{e?.price + "$"}</h3>
                    <button onClick={()=>handleDelete(e)}>Delete</button>
                  </div>
                );
              })}
        </div>
      </header>
  );
}

export default Home;
