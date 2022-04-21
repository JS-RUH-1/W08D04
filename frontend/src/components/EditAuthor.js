import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditAuthor() {
  const navigate = useNavigate();
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
        console.log(res.data);
        setName(res.data.name);
        setAge(res.data.age);
        setNationality(res.data.nationality);
        setImage(res.data.image);
        setGender(res.data.gender);
        setBooks(res.data.books);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }, []);

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
      .put("/authors/updateauthor/" + id, data)
      .then((res) => {
        navigate("/AuthorsPage");
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }

  function handelNewForm() {
    setBooks([...books, { title: "", img: "", price: 0, pages: 0 }]);
  }
  function handelDeleteForm(element, i) {
    setBooks(books.filter((item, index) => index !== i));
  }
  return (
    <form className="addBookForm">
      <label htmlFor="name">Enter name here</label>
      <input
        className="input__css"
        id="name"
        onChange={(e) => setName(e.target.value)}
        defaultValue={name}
        type="text"
      />
      <label htmlFor="age">Enter age here</label>
      <input
        type="number"
        className="input__css"
        id="age"
        onChange={(e) => setAge(e.target.value)}
        defaultValue={age}
      />
      <label htmlFor="nationality">Enter nationality here</label>
      <input
        className="input__css"
        id="nationality"
        onChange={(e) => setNationality(e.target.value)}
        defaultValue={nationality}
        type="text"
      />
      <label htmlFor="image">Enter image url here</label>
      <input
        className="input__css"
        id="image"
        onChange={(e) => setImage(e.target.value)}
        defaultValue={image}
        type="text"
      />
      <label htmlFor="gender">Enter gender here</label>
      <input
        className="input__css"
        id="gender"
        onChange={(e) => setGender(e.target.value)}
        defaultValue={gender}
        type="text"
      />

      <button className="new__btn" type="button" onClick={handelNewForm}>
        <h4>add book</h4>
      </button>

      {books.map((book, i) => {
        return (
          <form key={i} className="addBookForm2">
            <label htmlFor="title">Enter title here</label>
            <input
              className="input__css2"
              id="title"
              defaultValue={book.title}
              onChange={(e) => {
                book.title = e.target.value;
                setBooks([...books]);
              }}
              type="text"
            />
            <label htmlFor="imgUrl">Enter image url</label>
            <input
              className="input__css2"
              id="imgUrl"
              defaultValue={book.image}
              onChange={(e) => {
                book.image = e.target.value;
                setBooks([...books]);
              }}
              type="text"
              minLength={6}
            />
            <label htmlFor="price">Enter price here</label>
            <input
              className="input__css2"
              id="price"
              defaultValue={book.price || ""}
              onChange={(e) => {
                book.price = e.target.value;
                setBooks([...books]);
              }}
              type="number"
            />
            <label htmlFor="pages">Enter pages here</label>
            <input
              className="input__css2"
              id="pages"
              defaultValue={book.pages || ""}
              onChange={(e) => {
                book.pages = e.target.value;
                setBooks([...books]);
              }}
              type="number"
            />
            <button
              type="button"
              onClick={() => {
                handelDeleteForm(book, i);
              }}
              className="delete__btn"
            >
              <h4 className="">delete book</h4>
            </button>
          </form>
        );
      })}
      <button className="new__btn" onClick={hundleAdd} type="submit">
        Update
      </button>
    </form>
  );
}

export default EditAuthor;
