import React, { useState, useEffect } from "react";
import "./app.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Author from "./author";
import Book from "./book";
import BookInfo from "./BookInfo";
import AuthorkInfo from "./authorInfo";

function App(props) {
  const [data, setData] = useState([]);

  return (
    <BrowserRouter>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-item nav-link active" href="/">
                Author{" "}
              </a>
              <a class="nav-item nav-link" href="/Book">
                Books
              </a>
            </div>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Author />} />
        <Route path="/:id" element={<AuthorkInfo />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/Book/:id" element={<BookInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
