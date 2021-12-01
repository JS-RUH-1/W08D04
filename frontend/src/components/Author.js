import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Author = () => {
  const [author, setAuthor] = useState([]);
  let token = localStorage.getItem("token");


  useEffect(() => {
    Axios.get(`http://localhost:8080/author`).then((response) => {
      console.log(response.data);
      setAuthor(response.data);
    });
  }, []);

  const deleteItem = (title) => {
    Axios.delete(`http://localhost:8080/author/${title}`).then((res) => {
      console.log(res.data);
      setAuthor(res.data);
    });
    // console.log("Clicked")
  };

  const addAuthor = (e) => {
    e.preventDefault();
    // console.log(e.target.innerText);
    const name = e.target.form[0].value;
    const nationality = e.target.form[1].value;
    const image = e.target.form[2].value;

    Axios.post(`http://localhost:8080/author`, {
      name: name,
      nationality: nationality,
      image: image,
    }).then((res) => {
      console.log(res.data);
      setAuthor(res.data);
    });
  };

  return (
    <div>
      {/* // Author ADD  */}
      <div className="container">
        <div className="row">
          {token ? <form>
            <label for="exampleFormControlInput1" className="form-label">
              Author Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Khaled Abdulrahman"
            />
            <label for="exampleFormControlInput1" className="form-label">
              Nationality
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Saudi"
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
            <button className="btn btn-success" onClick={(e) => addAuthor(e)}>
              Add Author
            </button>
          </form> : ""}
          {author?.map((e) => (
            <div className="col-lg-3 p-3">
              <div className="card">
                <img
                  className="card-img-top img-author"
                  src={e?.image}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{e?.name}</h5>
                  {token ? <button
                    onClick={() => deleteItem(e?.name)}
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

export default Author;
