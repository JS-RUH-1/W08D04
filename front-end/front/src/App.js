import './App.css';
import axios from 'axios';
import React from 'react'

function App() {

  const [authors, setAuthors] = React.useState([])
  // const [display, setDisplay] = React.useState(false)
  const [nameD, setNameD] = React.useState('')

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
    axios.post('http://localhost:3001/authors',  {
    name: "Whatever",
      nationality:"Saudi",
      image: "null",
      gender: "male" ,
      books: [],
      age: 33
  })
    .then((res) => {          
      console.log(res)
    })
    .catch(error => {
        console.log(error.response)
    });
  }


  const updateAuthor = (e) =>{
    e.preventDefault()
    axios.put('http://localhost:3001/authors',  {
    name: "Whatever",
      nationality:"Saudi",
      image: "null",
      gender: "female" ,
      books: [],
      age: 44
  })
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

    <form>
      <input onChange={(e)=> setNameD(e.target.value)} placeholder="author name"/>
      <button onClick={(e)=>postAuthor(e)} >Post Author</button>
    </form>

    <form>
      <input onChange={(e)=> setNameD(e.target.value)} placeholder="author name"/>
      <button onClick={(e)=>updateAuthor(e)} >Update Author</button>
    </form>

    </div>
  );
}

export default App;
