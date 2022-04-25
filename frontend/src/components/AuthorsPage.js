import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./components.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function AuthorsPage() {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios
      .get("/authors")
      .then((res) => {
        console.log(res.data);
        setAuthors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function hundleImg(a) {
    navigate("/AuthorPage/" + a._id);
  }
  function hundleDelete(a) {
    console.log(a);
    axios
      .delete(`/authors/deleteauthor/${a._id}`)
      .then((res) => {
        console.log(res.data);
        setAuthors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function hundleEdit(a) {
    console.log(a);

    navigate("/EditAuthor/" + a._id);
  }
  return (
    <>
      <div className="second__nav">
        {/* <h2 className="header__Book"> Welcome to author page</h2> */}
      </div>
      <div className="continer">
        <div className="main__authors">
          {authors.map((a, i) => {
            return (
              <div key={i} className="author__card">
                <img
                  className="img"
                  onClick={() => {
                    hundleImg(a);
                  }}
                  width="200px"
                  src={a.image}
                  alt="Author img"
                />
              <p> {a.name}</p>

                <div style={{ display: "flex" }}>
                <div className="test">  <Button className="edit__btn" onClick={() => hundleEdit(a)}>
                    Edit
                  </Button>
                  <Button
                    className="delete__btn"
                    onClick={() => hundleDelete(a)}
                  >
                    Delete
                  </Button></div>
                
                </div>
              </div>
            );
          })}
          
        </div>

        <Button className="new__btnn">
          <Link className="Link_SecNavv" to="/AddAuthor">
            Add new author
          </Link>
        </Button>
      </div>
    </>
  );
}

export default AuthorsPage;
