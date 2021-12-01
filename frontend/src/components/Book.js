import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


const Book = () => {
  const [book, setBook] = useState([]);
  let token = localStorage.getItem("token");
  //   if (token) {
  //     console.log("there is token");
  // useEffect(() => {
    
  //   } else navigate("/noAccess");
  // }, []);

  useEffect(() => {
    Axios.get(`http://localhost:8080/Book`).then((response) => {
      //   console.log(response.data);
      setBook(response.data);
    });
  }, []);

  const deleteItem = (title) => {
    Axios.delete(`http://localhost:8080/Book/${title}`).then((res) => {
      console.log(res.data);
      setBook(res.data);
    });
  };

  const addBook = (e) => {
    e.preventDefault();
    console.log(e.target.form[2].value);
    // console.log(e.target.innerText);
    const title = e.target.form[0].value;
    const pages = e.target.form[1].value;
    const image = e.target.form[2].value;

    Axios.post(`http://localhost:8080/Book`, {
      title: title,
      pages: pages,
      image: image,
    }).then((res) => {
      console.log(res.data);
      setBook(res.data);
      // setItems(res.data)
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          {token ? <form>
            <label for="exampleFormControlInput1" className="form-label">
              Book Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="e.g. The Hound of the Baskervilles"
            />
            <label for="exampleFormControlInput1" className="form-label">
              Pages
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="e.g. 700"
            />
            <label for="exampleFormControlInput1" className="form-label">
              Image (URL)
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="htttp://www.example.jpg"
            />
            <button className="btn btn-success" onClick={(e) => addBook(e)}>
              Add Book
            </button>
          </form> : ''}

          {book.map((e) => (
            <div className="col-lg-3 p-3">
              <div className="card">
                <img
                  className="card-img-top img-book"
                  src={e?.image}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    
                  <a>
                                <Link to={`/book/Details/${e.title}`}>
                                  {e.title}
                                </Link>{" "}
                              </a>
                    {/* {e?.title} */}
                    </h5>
                  {token ? <button
                    onClick={() => deleteItem(e?.title)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button> : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Book;
