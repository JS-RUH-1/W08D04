import './App.css';
import Authors from './components/Authors';
import Details from './components/Details'
import { BrowserRouter , Routes, Route  } from "react-router-dom";




function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Authors/>} />
          <Route path="/Details/:id" element={<Details/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
