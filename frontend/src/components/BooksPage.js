import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./components.css";
import EditBook from "./EditBook";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
function BooksPage() {
  const navigate = useNavigate();
  const [Books, setBooks] = useState([]);
  useEffect(() => {
    axios 
      .get("/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function hundleDelete(book) {
    console.log(book);
    axios
      .delete(`/books/deletebook/${book._id}`)
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function hundleEdit(book) {
    console.log(book);

    navigate("/EditBook/" + book._id);
  }
  return (
    <div>
      <div className="second__nav">
        <h2 >Welcome to book page</h2>
      
      </div>
      <div className="main__authors">
        {Books.map((book) => {
          return (
            <div className="book__card">
              <img className="img" src={book.image} alt="Author img" />
              <p>{book.title}</p>
              <p> {book.price} $</p>
              <p> {book.pages} pages</p>
              <Button className="edit__btn" onClick={() => hundleEdit(book)}>
                Edit
              </Button>
              <Button
                className="delete__btn"
                onClick={() => hundleDelete(book)}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
      <Button >
          <Link to="/AddBook" className="Add-new-book">
            {" "}
            Add new book
          </Link>
        </Button>
    </div>
  );
}

export default BooksPage;
