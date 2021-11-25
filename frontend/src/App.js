import Author from "./pages/Author";
import EditAuthor from "./pages/EditAuthor";
import NavBar from "./components/NavBar";
import Books from "./pages/Books";
import EditBook from "./pages/EditBook";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Author />}></Route>
          <Route exact path="/editAuthor/:id" element={<EditAuthor />}></Route>
          <Route exact path="/books" element={<Books />}></Route>
          <Route exact path="/editBook/:id" element={<EditBook />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
