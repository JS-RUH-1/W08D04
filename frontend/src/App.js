
import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from './components/Home'
import Books from './components/Books';
import Authors from './components/Authors';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Nav />
      <Routes>
      
        <Route path='/' exact element={<Home />} />
        <Route path='/Authors' element={<Authors />} />
        <Route path='/Books' element={<Books />} />
      
      </Routes>
      </header>
    </div>
  );
}

export default App;
