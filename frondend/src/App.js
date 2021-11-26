import Books from "./pages/books/Books";
import Auther from "./pages/auhters/Authers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import SingleBook from "./pages/singleBook/SingleBook";
import SingleAuther from "./pages/singleAuther/SingleAuther";

function App() {

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='/' element={<Books />} />
        </Routes>
        <Routes>
          <Route path='/allAuthers' element={<Auther />} />
        </Routes>
        <Routes>
          <Route path='/singleBook/:id' element={<SingleBook />}/>
        </Routes>

        <Routes>
          <Route path='/singleAuther/:id' element={<SingleAuther />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
