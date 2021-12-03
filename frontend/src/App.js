
import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from './components/Home'
import Books from './components/Books';
import Authors from './components/Authors';
import Nav from './components/Nav';
import Signup from './components/Signup'
import Login from './components/Login';
import Details from './components/Details';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Nav />
      <Routes>
      
        <Route exact path='/' exact element={<Home />} />
        <Route path='/Authors' element={<Authors />} />
        <Route path='/Books' element={<Books />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/MoreD/:id' element={<Details />} />
      
      </Routes>
      </header>
    </div>
  );
}

export default App;
