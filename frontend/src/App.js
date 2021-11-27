import { useState, useEffect } from "react";

import "./App.css";
import axios from "axios";



function App() {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [nationality, setNationality] = useState("");
  const [autherImage, setAutherImage] = useState("");
  const [gender, setGender] = useState("");
  const [id, setId] = useState();
  
  
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get("/api/auther/getAuther").then((res) => {
      console.log(res);
      setAuthors(res.data);
      console.log(res.data);
    });
  }, []);

  // function getAuthors(){

  // }

  function postAuther(e) {
    e.preventDefault();

    axios
      .post("/api/auther/postAuther", {
        name: name,
        age: age,
        nationality: nationality,
        autherImage: autherImage,
        gender: gender,
      })
      .then((res) => {
        setAuthors(res.data);
      });
  }

  function deleteAuthor(e, _id) {
    e.preventDefault();
    console.log(_id);
    axios.delete(`/api/auther/deleteAuther/${_id}`).then((res) => {
      console.log(res.data);
      setAuthors(res.data);
    });
  }

  function editAuther(e, id, name, age, nationality, autherImage, gender) {
    e.preventDefault();
    setEditMode(true);
    console.log(id);
    setId(id);
    setName(name);
    setAge(age);
    setNationality(nationality);
    setGender(gender);
    setAutherImage(autherImage);
  }
  function saveData(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/api/auther/editAuther/${id}`, {
        name: name,
        age: age,
        nationality: nationality,
        autherImage: autherImage,
        gender: gender,
      })
      .then((res) => {
        console.log(res.data);
        setAuthors(res.data);
        setEditMode(false);
      });
  }



  return (

    <div className="App">
      {authors.map((data) => {
        return (
          <div>
            <p>{data.name}</p>
            <img src={data.autherImage} style={{ height: "200px" }} />
            <button onClick={(e) => deleteAuthor(e, data._id)}>Delete</button>
            <button
              onClick={(e) =>
                editAuther(
                  e,
                  data._id,
                  data.name,
                  data.age,
                  data.nationality,
                  data.autherImage,
                  data.gender
                )
              }
            >
              Edit
            </button>
            <button>more info</button>
          </div>
        );
      })}

      <div>
        <form>
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
          <label>Age</label>
          <input
            type="number"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          ></input>
          <label>Nationality</label>
          <input
            value={nationality}
            type="text"
            onChange={(e) => setNationality(e.target.value)}
          ></input>
          <label>Image</label>
          <input
            type="text"
            value={autherImage}
            onChange={(e) => setAutherImage(e.target.value)}
          ></input>
          <label for="male">Male</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={(e) => setGender(e.target.value)}
          ></input>
          <label for="female">Female</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={(e) => setGender(e.target.value)}
          ></input>
          {(function () {
            if (editMode === true) {
              return (
                <button
                  onClick={(e) => {
                    saveData(e);
                  }}
                >
                  save
                </button>
              );
            }
          })()}
          <input
            type="submit"
            value="Add Author"
            onClick={(e) => postAuther(e)}
          ></input>
        </form>
      </div>
    </div>
 
  );
}

export default App;
