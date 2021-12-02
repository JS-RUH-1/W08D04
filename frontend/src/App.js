import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Book from "./components/Book";
import Author from "./components/Author";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
   Link 
} from "react-router-dom";
import Details from "./components/Details";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [resource, setResource] = useState("book");

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <header className="App-header ">
          <Routes>
            {/* <Route exact path="/book">
              <Book />
            </Route> */}
            {/* <Route exact path="/author">
              <Author />
            </Route> */}

            <Route
                exact
                path="/author"
                element={<Author />}
              ></Route>

            <Route
                exact
                path="/book"
                element={<Book />}
              ></Route>
            <Route
                exact
                path="/book/Details/:title"
                element={<Details />}
              ></Route>
              <Route
                exact
                path="/login"
                element={<Login />}
              ></Route>
              <Route
                exact
                path="/register"
                element={<Register />}
              ></Route>
          </Routes>
          <div>

            {/* <Link to="book">
              <button id="resource" className="btn btn-dark">
                Book
              </button>
            </Link>

            <Link to="author">
              <button id="resource" className="btn btn-dark">
                Author
              </button>
            </Link> */}

          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
