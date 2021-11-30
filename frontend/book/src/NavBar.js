import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Nav, Container, Navbar } from "react-bootstrap";
import Author from "./Author";
import Book from "./Book";
import Home from "./Home";
import AddBook from "./AddBook";

function NavBar() {
  return (
    <div>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav className="me-auto">
              <li>
                <Nav.Link href="/author">Author</Nav.Link>
              </li>
              <li>
                <Nav.Link href="/book">Book</Nav.Link>
              </li>
              <li>
                <Nav.Link href="/addBook">Add Book</Nav.Link>
              </li>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/Author" element={<Author />}></Route>
          <Route path="/Book" element={<Book />}></Route>
          <Route path="/addBook" element={<AddBook />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default NavBar;
