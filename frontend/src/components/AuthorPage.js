import React, { useState, useEffect } from "react";
import "./components.css";
import axios from "axios";
import { useParams } from "react-router-dom";
function AuthorPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [nationality, setNationality] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [books, setBooks] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/authors/authorbyid/${id}`)
      .then((res) => {
        setName(res.data.name);
        setAge(res.data.age);
        setGender(res.data.gender);
        setNationality(res.data.nationality);
        setImage(res.data.image);
        setBooks(res.data.books);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="author__card">
      {" "}
      <p> {name}</p>
      <div className="img__div">
        <img
          className="img"
          width={150}
          height={120}
          src={image}
          alt="Author img"
        />
      </div>
      <p> {age} years</p>
      <p> {gender}</p>
      <p> {nationality}</p>
      <h4>{name} Books: </h4>
      {books.map((book, i) => {
        return (
          <div key={i} className="book__card">
            <p> {book.title}</p>
            <img className="img" src={book.image} alt="Author img" />
            <p> {book.price} $</p>
            <p> {book.pages} pages</p>
          </div>
        );
      })}
    </div>
  );
}

export default AuthorPage;
