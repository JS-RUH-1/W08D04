 
 //create react==>Done
 //create router ==>
 // create two file [authoe - book]==>
import Book from './components/Book'
import Author from './components/Author'
import {BrowserRouter as Router , Routes , Route ,Link} from 'react-router-dom'
 
 import './App.css';

function App() {
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
</Routes>
    </Router>
 
    </>
  );
}

export default App;
