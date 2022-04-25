import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function AddAuthor() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [nationality, setNationality] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [books, setBooks] = useState([]);

  function handelNewForm() {
    setBooks([...books, { title: "", img: "", price: 0, pages: 0 }]);
  }
  function handelDeleteForm(element, i) {
    setBooks(books.filter((item, index) => index !== i));
  }

  function hundleAdd() {
    const data = {
      name: name,
      image: image,
      age: age,
      nationality: nationality,
      gender: gender,
      books: books,
    };
    for (let book in books) {
      if (
        book.title !== "" &&
        book.img !== "" &&
        book.price !== 0 &&
        book.pages !== 0
      ) {
        continue;
      } else alert("Complete empty fields");
    }
    axios
      .post("/authors/AddAuthor", data)
      .then((res) => {
        navigate("/AuthorsPage");
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }
  return (
    <form className="addBookForm">
      <label htmlFor="name">Enter name here</label>
      <input
        className="input__css"
        id="name"
        onChange={(e) => setName(e.target.value)}
        type="text"
        required
      />
      <label htmlFor="age">Enter age here</label>
      <input
        className="input__css"
        id="age"
        onChange={(e) => setAge(e.target.value)}
        type="text"
        required
      />
      <label htmlFor="nationality">Enter nationality here</label>
      <input
        className="input__css"
        id="nationality"
        onChange={(e) => setNationality(e.target.value)}
        type="text"
        required
      />
      <label htmlFor="image">Enter image url here</label>
      <input
        className="input__css"
        id="image"
        onChange={(e) => setImage(e.target.value)}
        type="text"
        required
      />
      <label htmlFor="gender">Enter gender here</label>
      <input
        className="input__css"
        id="gender"
        onChange={(e) => setGender(e.target.value)}
        type="text"
        required
      />

   

      {books.map((book, i) => {
        return (
          <form key={i} className="addBookForm2">
            <label htmlFor="title">Enter title here</label>
            <input
              className="input__css2"
              id="title"
              value={book.title}
              onChange={(e) => {
                book.title = e.target.value;
                setBooks([...books]);
              }}
              type="text"
              required
            />
            <label htmlFor="imgUrl">Enter image url</label>
            <input
              className="input__css2"
              id="imgUrl"
              value={book.image}
              onChange={(e) => {
                book.image = e.target.value;
                setBooks([...books]);
              }}
              type="text"
              required
            />
            <label htmlFor="price">Enter price here</label>
            <input
              className="input__css2"
              id="price"
              value={book.price || ""}
              onChange={(e) => {
                book.price = e.target.value;
                setBooks([...books]);
              }}
              type="text"
              required
            />
            <label htmlFor="pages">Enter pages here </label>
            <input
              className="input__css2"
              id="pages"
              value={book.pages || ""}
              onChange={(e) => {
                book.pages = e.target.value;
                setBooks([...books]);
              }}
              type="text"
              required
            />
            <Button
              type="button"
              onClick={() => {
                handelDeleteForm(book, i);
              }}
              className="delete__btn"
            >
              delete book
            </Button>
          </form>
        );
      })}
      <div className="all-btn"> 
       <Button  onClick={hundleAdd} type="submit">
        Add
      </Button>
      <Button type="button" onClick={handelNewForm}>
        add book
      </Button></div>
    
    </form>
  );
}

export default AddAuthor;
