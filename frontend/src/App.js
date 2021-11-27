import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Book from "./components/Book";
import Author from "./components/Author";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [resource, setResource] = useState("book");

  return (
    <Router>
      <div className="App">
        <header className="App-header ">
          <Switch>
            <Route exact path="/book">
              <Book />
            </Route>
            <Route exact path="/author">
              <Author />
            </Route>
          </Switch>
          <div>
            <Link to="book">
              <button id="resource" className="btn btn-dark">
                Book
              </button>
            </Link>

            <Link to="author">
              <button id="resource" className="btn btn-dark">
                Author
              </button>
            </Link>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
