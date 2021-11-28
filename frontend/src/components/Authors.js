import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [authorAge, setAuthorAge] = useState();
  const [authorNationality, setAuthorNationality] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [authorGender, setAuthorGender] = useState("");
  const [NewAuhtor, setNewAuthor] = useState();

  useEffect(() => {
    axios.get("http://localhost:3001/author/getAuthor").then((res) => {
      setAuthors(res.data);
    });
  }, [NewAuhtor]);

  const addAuthor = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/author/postAuthor", {
        name: authorName,
        age: authorAge,
        nationality: authorNationality,
        image: authorImage,
        gender: authorGender,
      })

      .then(
        (response) => {
          console.log("jhg");
          console.log(response);
          setNewAuthor(response);
        },
        (error) => {
          setNewAuthor("response");
          console.log(error);
        }
      );
  };

  function deleteIn(id) {
    // e.preventDefault()
    console.log(id);
    axios.delete(`http://localhost:3001/author/delete/${id}`).then((res) => {
      console.log("deleted", res.data);
      setNewAuthor(res.data);
    });
  }

  function edit(id){
    axios.put(`http://localhost:3001/author/update/${id}`,
    {
      name: authorName,
      age: authorAge,
      nationality: authorNationality,
      image: authorImage,
      gender: authorGender,
    })
    .then((res)=>{
      console.log("updated", res.data)
      setNewAuthor(res.data)
  })
  }
  return (
    <div>
      <h4>Add Author:</h4>
      <form>
        <input
          placeholder="Author Name:"
          onChange={(e) => setAuthorName(e.target.value)}
        ></input>
        <input
          placeholder="Age :"
          onChange={(e) => setAuthorAge(e.target.value)}
        ></input>
        <input
          placeholder="Nationality :"
          onChange={(e) => setAuthorNationality(e.target.value)}
        ></input>
        <input
          placeholder="Image :"
          onChange={(e) => setAuthorImage(e.target.value)}
        ></input>
        <input
          placeholder="Gender :"
          onChange={(e) => setAuthorGender(e.target.value)}
        ></input>
        <button onClick={(e) => addAuthor(e)}>Add</button>
      </form>
      <div className="authors-container">
        {authors.map((get) => {
          return (
            <div className="authors-cards">
              <img src={get.image} height="200px" width="200px" />
              <p>{get.name}</p>
              <p>{get.age}</p>
              <p>{get.nationality}</p>
              <p>{get.gender}</p>
              {/* <p>{get.books}</p> */}

              <button 
               onClick={()=>{
                 edit(get._id)}}
                 >Edit</button>

              <button
                onClick={() => {
                  deleteIn(get._id);
                }}
              >
                Delete
              </button>

              <button>More details</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
