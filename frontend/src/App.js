 
 //create react==>Done
 //create router ==>
 // create two file [authoe - book]==>
import Book from './components/Book'
import Author from './components/Author'
import FullCard from './components/FullCard'
import { useEffect, useState } from "react";
import axios from "axios"
import {BrowserRouter as Router , Routes , Route ,Link} from 'react-router-dom'
 
 import './App.css';

function App() {



  const [book ,setBook] = useState([])
  const [newBook ,setNewBook] = useState({})

  useEffect(()=>{ 
    
    axios.get('http://localhost:3030/books')
    .then((res)=>{
        setBook(res.data)
    })
    },[newBook])


  return (
    <>
    <Router>

<ul>
<li><Link exact to ='components/Book'>Book</Link></li>
<li><Link to='components/Author'>Author</Link></li>
</ul>


{/* ****************** */}
<Routes>
<Route exact path='components/Book' element={<Book/>}/>
<Route exact path='components/Author' element={<Author/>}/>

<Route path='/Book/:title' element={<FullCard data={book}/>}/>

 
</Routes>
    </Router>
 
    </>
  );
}

export default App;
