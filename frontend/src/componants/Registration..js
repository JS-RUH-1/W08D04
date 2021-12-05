import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [nationality, setNationality] = useState("");
  const [autherImage, setAutherImage] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  function postAuther(e) {
    e.preventDefault();

    axios
      .post("/api/auther/postAuther", {
        name: name,
        age: age,
        nationality: nationality,
        autherImage: autherImage,
        gender: gender,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data)
        window.location.replace("/")
      });
  }

  return (
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
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        ></input>
        <input
          type="submit"
          value="Log in"
          onClick={(e) => postAuther(e)}
        ></input>
      </form>
    </div>
  );
};

export default Login;
