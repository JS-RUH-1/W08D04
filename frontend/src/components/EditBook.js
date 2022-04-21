import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./components.css";
function EditBook() {
  const navigate = useNavigate();
  const [Title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState();
  const [pages, setPages] = useState();
  const { id } = useParams();
  const [book, setbook] = useState([]);
  useEffect(() => {
    axios
      .get("/books/bookbyid/" + id)
      .then((res) => {
        setbook(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function hundleUpdate() {
    let data = {
      title: Title,
      image: imgUrl,
      price: price,
      pages: pages,
    };
    axios
      .put("/books/updatebook/" + id, data)
      .then((res) => {
        navigate("/BooksPage");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <form className="addBookForm">
      <label htmlFor="title">Enter title here</label>
      <input
        className="input__css"
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        defaultValue={book.title}
        type="text"
        required
      />
      <label htmlFor="imgUrl">Enter image url</label>
      <input
        className="input__css"
        id="imgUrl"
        onChange={(e) => setImgUrl(e.target.value)}
        defaultValue={book.image}
        type="text"
        required
      />
      <label htmlFor="price">Enter price here</label>
      <input
        className="input__css"
        id="price"
        onChange={(e) => setPrice(e.target.value)}
        defaultValue={book.price}
        type="number"
        required
      />
      <label htmlFor="pages">Enter pages here</label>
      <input
        className="input__css"
        id="pages"
        onChange={(e) => setPages(e.target.value)}
        defaultValue={book.pages}
        type="number"
        required
      />
      <button className="edit__btn" onClick={hundleUpdate} type="submit">
        update
      </button>
    </form>
  );
}

export default EditBook;
