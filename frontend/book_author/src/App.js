import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from "./components/Home";
import AuthorDetails from "./components/AuthorDetails";
import BookDetails from "./components/BookDetails";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  // const [books, setBooks] = useState([]);
  // const [authors, setAuthors] = useState([]);
  // const [btn, setBtn] = useState(true);
  // const [newValue, setNewValue] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:8080/authors/").then((res) => {
  //     setAuthors(res.data);
  //     console.log(res.data);
  //   });
  //   axios.get("http://localhost:8080/books/").then((res) => {
  //     setBooks(res.data);
  //     console.log(res.data);
  //   });
  // }, [newValue]);

  return (
    <Router>
    <div className="App">
      <Navbar/>
      <header className="App-header">
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Home" element={<Home />} />
        <Route path="/Author/:id" element={<AuthorDetails />} />
        <Route path="/Book/:id" element={<BookDetails />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
    </Routes>
    </header>
    </div>
    </Router>
  );
}

export default App;
