import './App.css';
import axios from 'axios';
import React from 'react'

function App() {

  const [authors, setAuthors] = React.useState([])
  // const [display, setDisplay] = React.useState(false)
  const [nameD, setNameD] = React.useState('')
  const [author, setAuthor] = React.useState({
      name: "",
      age: 0,
      nationality: "",
      image: "",
      gender: "",
      books: []
  })

  const [authorU, setAuthorU] = React.useState({
    name: "",
    age: 0,
    nationality: "",
    image: "",
    gender: "",
    books: []
})

  React.useEffect(()=>{
    console.log(author)
  }, [author])  

  React.useEffect(()=>{
    axios.get('http://localhost:3001/authors')
    .then((res) => {          
      console.log(res.data)
      setAuthors(res.data)
    })
    .catch(error => {
        console.log(error.response)
    });
  }, [])  

  const deleteAuthor = (e) =>{
    e.preventDefault()
    console.log(nameD)
    axios.delete('http://localhost:3001/authors', { data: { name: nameD} })
    .then((res) => {          
      console.log(res)
    })
    .catch(error => {
        console.log(error.response)
    });
  }

  const postAuthor = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:3001/authors',  author)
    .then((res) => {          
      console.log(res)
    })
    .catch(error => {
        console.log(error.response)
    });
  }


  const updateAuthor = (e) =>{
    e.preventDefault()
    axios.put('http://localhost:3001/authors',  authorU)
    .then((res) => {          
      console.log(res)
    })
    .catch(error => {
        console.log(error.response)
    });
  }

  return (
    <div className="App">
     {authors.map((author, index)=>(
       <div key={index}>
         <img alt="author-img" width='200px' src={author.image}/>
         <ul>
            <li >{author.name}</li>
            <li >{author.gender}</li>
            <li >{author.age}</li>
            <li >{author.nationality}</li>
         </ul>
       </div>
     ))}


    <form>
      <input onChange={(e)=> setNameD(e.target.value)} placeholder="author name"/>
      <button onClick={(e)=>deleteAuthor(e)} >Delete Author</button>
    </form>
<br/>
    <form>
      <input onChange={(e)=> setAuthor({...author, ['name']: e.target.value})} placeholder="author name"/>
      <input onChange={(e)=> setAuthor({...author, ['age']: parseInt(e.target.value)})} placeholder="author age"/>
      <input onChange={(e)=> setAuthor({...author, ['nationality']: e.target.value})} placeholder="author nationality"/>
      <input onChange={(e)=> setAuthor({...author, ['gender']: e.target.value})} placeholder="author gender"/>
      <input onChange={(e)=> setAuthor({...author, ['image']: e.target.value})} placeholder="author image"/>
      <input onChange={(e)=> setAuthor({...author, ['books']: e.target.value})} placeholder="author books"/>
      <button onClick={(e)=>postAuthor(e)} >Post Author</button>
    </form>
<br/>
    <form>
      <input onChange={(e)=> setAuthorU({...authorU, ['name']: e.target.value})} placeholder="author name"/>: <br/>
      <input onChange={(e)=> setAuthorU({...authorU, ['age']: parseInt(e.target.value)})} placeholder="author age"/>
      <input onChange={(e)=> setAuthorU({...authorU, ['nationality']: e.target.value})} placeholder="author nationality"/>
      <input onChange={(e)=> setAuthorU({...authorU, ['gender']: e.target.value})} placeholder="author gender"/>
      <input onChange={(e)=> setAuthorU({...authorU, ['image']: e.target.value})} placeholder="author image"/>
      <input onChange={(e)=> setAuthorU({...authorU, ['books']: e.target.value})} placeholder="author books"/>
      <button onClick={(e)=>updateAuthor(e)} >Update Author</button>
    </form>
<br/>

    </div>
  );
}

export default App;
