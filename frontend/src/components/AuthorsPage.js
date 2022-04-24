import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./components.css";

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
                <p> {a.name}</p>
                <img
                  className="img"
                  onClick={() => {
                    hundleImg(a);
                  }}
                  width="200px"
                  src={a.image}
                  alt="Author img"
                />
                <div style={{ display: "flex" }}>
                  <button className="edit__btn" onClick={() => hundleEdit(a)}>
                    Edit
                  </button>
                  <button
                    className="delete__btn"
                    onClick={() => hundleDelete(a)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button className="new__btnn">
          <Link className="Link_SecNav" to="/AddAuthor">
            Add new author
          </Link>
        </button>
      </div>
    </>
  );
}

export default AuthorsPage;
