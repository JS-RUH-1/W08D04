import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NotAcsess from './pages/NotAcsess';
import Books from './pages/Books';
import Author from './pages/Author';
import BookDetails from "./pages/BookDetails";
import EditBook from "./components/EditBook";
import AuthorDetails from "./pages/AuthorDetails";



function App() {
  return (
  <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route  path="/books" element={<Books/>}/>
          <Route  path="/update/:bookid"  element={<EditBook/>}/>
          <Route  path="/books/:bookid" element={<BookDetails/>}/>
          <Route  path="/authors" element={<Author/>}/>
          {/* <Route  path="/authors/:authid" element={<AuthorDetails/>}/> */}
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/register" element={<SignUp/>}/>
          <Route exact path="/not" element={<NotAcsess/>}/>
        </Routes>
      </BrowserRouter>
  
  );
}

export default App;