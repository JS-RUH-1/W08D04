import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Books from './pages/Books';
import Author from './pages/Author';
import BookDetails from "./pages/BookDetails";
import AuthorDetails from "./pages/AuthorDetails";
import Footer from  "./components/Footer" ;


function App() {
  return (
  <>
   <BrowserRouter>
      <Navbar/>
      {/* <Login/>
      <SignUp/> */}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/books" element={<Books/>}/>
          <Route path="/books/:bookid" element={<BookDetails/>}/>
          <Route path="/authors" element={<Author/>}/>
          <Route path="/authors/:authid" element={<AuthorDetails/>}/>
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
   
 </>
  );
}

export default App;