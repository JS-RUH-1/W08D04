 
 //create react==>Done
 //create router ==>
 // create two file [authoe - book]==>
import Book from './components/Book'
import Author from './components/Author'
import FullCard from './components/FullCard'
import Sign from './components/Sign'
import Log from './components/Log'
import { useEffect, useState } from "react";
import axios from "axios"
import AuthorFullCard from './components/AuthorFullCard'
import {BrowserRouter as Router , Routes , Route ,Link} from 'react-router-dom'
 
 import './App.css';

function App() {



  const [book ,setBook] = useState([])
  const [newBook ,setNewBook] = useState({})

  const [author,setAuthor]=useState([]);
  const [newAuthor,setNewAuthor]= useState({});

////////////////////////Books////////////
  useEffect(()=>{ 
    
    axios.get('http://localhost:3030/books')
    .then((res)=>{
        setBook(res.data)
    })
    },[newBook])



/////////////Authors////////////////
    useEffect(()=>{

      axios.get('http://localhost:3030/authors')
      .then((res)=>{
          // console.log(res.data)
          setAuthor(res.data)
      })

  },[newAuthor])



  return (
    <>
    <Router>

<ul>
  
<li><Link  to ='components/Book'>Book</Link></li>
<li><Link to='components/Author'>Author</Link></li>
</ul>


{/* ****************** */}
<Routes>

<Route exact path='/' element={<Sign/>}/>
<Route path='Login' element={<Log/>}/>
<Route path='components/Book' element={<Book/>}/>
<Route path='components/Author' element={<Author/>}/>

<Route path='/Book/:title' element={<FullCard data={book}/>}/>
<Route path='/Author/:name' element={<AuthorFullCard data={author}/>}/>
 
</Routes>
    </Router>
 
    </>
  );
}

export default App;
