import { useParams } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Details = () => {
  const { title } = useParams();
  let token = localStorage.getItem("token");

  const [book, setBook] = useState({});

  const [bookTitle, setBookTitle] = useState('')
  const [pages, setPages] = useState()
  const [image, setImage] = useState('')



  async function fetchData() {
    const res = await Axios.get(`http://localhost:8080/Book/${title}`);
    const data = await res.data;
    setBook(data);
    console.log(title)
    console.log(data);
  }
  useEffect(() => {
    fetchData();
  }, [title]);

  const deleteItem = (title) => {
    Axios.delete(`http://localhost:8080/Book/${title}`).then((res) => {
      console.log(res.data);
      setBook(res.data);
    });
  };

  const updateItem = (e) => {
    e.preventDefault();
    bookTitle ? console.log(bookTitle) : console.log("no title")
    Axios.put(`http://localhost:8080/Book/${title}`, {
      title: bookTitle,
      pages: pages,
      image: image,
    }).then((res) => {
      console.log(res.data);
      setBook(res.data);
    });
  };

  return (
    <div>
      <div className="row">
        <div className={token ? "col-lg-6 p-3" : "col-lg-12 p-3"}>
          <div className="card">
            <img
              className="card-img-top img-book"
              src={book[0]?.image}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{book[0]?.title}</h5>
              <button
                onClick={() => deleteItem(book[0]?.title)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {token ? <div className="col-lg-6">
          <form>
            <label for="exampleFormControlInput1" className="form-label">
              Book Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="e.g. The Hound of the Baskervilles"
              onChange={(e) => setBookTitle(e.target.value)}
            />
            <label for="exampleFormControlInput1" className="form-label">
              Pages
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="e.g. 700"
              onChange={(e) => setPages(e.target.value)}
            />
            <label for="exampleFormControlInput1" className="form-label">
              Image (URL)
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="htttp://www.example.jpg"
              onChange={(e) => setImage(e.target.value)}
            />
            <button className="btn btn-success" onClick={(e) => updateItem(e)}>Update Book</button>
          </form>
        </div> : ""}
      </div>
    </div>
  );
};

export default Details;
