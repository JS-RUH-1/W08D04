import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {Library} from './Library.js';
import {Authors} from './Authors.js';
import {AddBook} from './AddBook.js';
import {AddAuthor} from './AddAuthor.js';
import {UserBooks} from './UserBooks.js';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#545499"}}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Library</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="Authors" className="nav-link">Authors</Link>
              </li>
              <li className="nav-item">
                <Link to="UserBooks" className="nav-link">Your books</Link>
              </li>
              <li className="nav-item">
                <Link to="AddBook" className="nav-link">Add book</Link>
              </li>
              <li className="nav-item">
                <Link to="AddAuthor" className="nav-link">Add author</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={<Library />}/>
        <Route path="UserBooks" element={<UserBooks />}/>
        <Route path="AddBook" element={<AddBook />}/>
        <Route path="Authors" element={<Authors />}/>
        <Route path="AddAuthor" element={<AddAuthor />}/>
      </Routes>
    </Router>
  );
}

export default App;
