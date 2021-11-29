import { useParams} from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



const Details = () => {
    const { title } = useParams();
    const [book, setBook] = useState([]);

    useEffect(() => {
        // Axios.get(`http://localhost:8080/Book/${title}`).then((response) => {
        //   //   console.log(response.data);
        //   setBook(response.data);
        // });
        console.log("in details " + title)
      }, []);
      const deleteItem = (title) => {
        Axios.delete(`http://localhost:8080/Book/${title}`).then((res) => {
          console.log(res.data);
          setBook(res.data);
        });
      };

    return (
        <div>
            <div className="col-lg-3 p-3">
              <div className="card">
                <img
                  className="card-img-top img-book"
                  src={book?.image}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">
                  
                    {book?.title}</h5>
                  <button
                    onClick={() => deleteItem(book?.title)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
        </div>
    )
}

export default Details
