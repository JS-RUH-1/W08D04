import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Router from "router";
import AuthorDetails from "./components/AuthorDetails";
import BookDetails from "./components/BookDetails";

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
    <div className="App">
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Home" element={<Home />} />
        <Route path="/Author/:id" element={<AuthorDetails />} />
        <Route path="/Book/:id" element={<BookDetails />} />
    </Routes>
    </div>
  );
}

export default App;
