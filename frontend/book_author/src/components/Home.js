
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [allBooks, setAllBooks] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [btn, setBtn] = useState(true);
  const [newValue, setNewValue] = useState([]);
  const [newValueBtn, setNewValueBtn] = useState(false);
  const [img, setImg] = useState("-1");

  useEffect(() => {
    console.log("HOME USEEFFECT")
    axios.get("http://localhost:8000/backend/authors/").then((res) => {
      console.log("HOME USEEFFECT AXIOS AUTHOR")
      setAllAuthors(res.data);
      console.log(res.data);
    }).catch(err=>{console.log('error catched at fetching all authors',err)});
    axios.get("http://localhost:8000/backend/books/").then((res) => {
      console.log("HOME USEEFFECT AXIOS BOOK")
      setAllBooks(res.data);
      console.log(res.data);
    }).catch(err=>{console.log('error catched at fetching all books',err)});
  }, [newValue]);

  let handleSubmit = e =>{
    setNewValueBtn(false)
    console.log("ON SUBMIT:",e)
    e.preventDefault();
    btn?
    axios.post("http://localhost:8000/backend/authors/",
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
    axios.post("http://localhost:8000/backend/books/",
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
    axios.delete(`http://localhost:8000/backend/authors/${e._id}`).then((res)=>setNewValue(e)).catch(err=>{console.log('error catched at deleting author',err)})
    :
    axios.delete(`http://localhost:8000/backend/books/${e._id}`).then((res)=>setNewValue(e)).catch(err=>{console.log('error catched at deleting book',err)})
  }
  return (
      <div >
        <button className={btn ? "btn active" : "btn"}
          onClick={() => (btn ? "" : (setImg('-1'), setBtn(!btn)))} >
          Authors
        </button>
        <button className={!btn ? "btn active" : "btn"} onClick={() => (!btn ? "" : setBtn(!btn))} >
          Books
        </button>
        <div>
          <button className={!newValueBtn?"":"hidden"} onClick={()=>setNewValueBtn(true)}>Add a new {btn?"Author":"Book"}</button>
          <form className={newValueBtn?"form":"hidden"} onSubmit={(e)=>handleSubmit(e)}>
            <label> {btn?"Author name:":"Book title:"}</label><input type="text"/> 
            <br/>
            <label> {btn?"Author Age:":"Number of pages:"}</label><input type="text"/>
            <br/>
            <label> {btn?"Author nationality:":"price:"}</label><input type="text"/>
            <br/>
            <label> Image URL: </label><input type="text"/>
            <br/>
            { btn ? <label> Author gender: </label> : "" }
            { btn ? <input type="text"/> : "" }
            <br/>
            <div><input type="submit" value="Submit" /><button className="cancel_btn" onClick={()=>setNewValueBtn(false)}>cancel</button></div>
          </form>
        </div>
        <div className="parent">
          {btn
            ? allAuthors.map((e,i) => {
                return (
                  <div key={e?._id} className="author_card" key={e.id}>
                    <Link className="text-decoration-none color-inherit" to={`/Author/${e._id}`}><h2>{e?.name}</h2></Link>
                    <h3>{e?.nationality}</h3>
                    <h3>{i==img?img:""}</h3>
                    <img className="cover" onClick={()=>setImg(i)} src={e?.image} />
                    <div onClick={()=>setImg("-1")} className={i==img?"image_parent":"image_parent hidden"}>
                      <span className="close">&times;</span>
                      <img onClick={()=>setImg(i)} className="contain" src={e?.image} />
                    </div>
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
                    <Link className="text-decoration-none color-inherit" to={`/Book/${e._id}`}>
                        <h2>{e?.title}</h2>
                    </Link>
                    <h3>{e?.pages}</h3>
                    <img className="cover" onClick={()=>setImg(i)} src={e?.image} />
                    <div onClick={()=>setImg("-1")} className={i==img?"image_parent":"image_parent hidden"}>
                      <span className="close">&times;</span>
                      <img onClick={()=>setImg(i)} className="contain" src={e?.image} />
                    </div>
                    <h3>{e?.price + "$"}</h3>
                    <button onClick={()=>handleDelete(e)}>Delete</button>
                  </div>
                );
              })}
        </div>
      </div>
  );
}

export default Home;

