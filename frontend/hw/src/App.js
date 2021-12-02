import './App.css';
import Authors from './components/Authors';
import Details from './components/Details'
import { Routes, Route  } from "react-router-dom";
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';




function App() {
  return (
    <div className="App">
    <NavBar/>
      
        <Routes>
          <Route exact path="/" element={<Authors/>} />
          <Route path="/Details/:id" element={<Details/>}/>
          <Route path ="/Login" element={<Login/>}/>
          <Route path ="/Signup" element={<Signup/>}/>
        </Routes>
    </div>
  );
}

export default App;
