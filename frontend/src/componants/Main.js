import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import Books from "./Books";
import "bootstrap/dist/css/bootstrap.min.css";

function Main() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [nationality, setNationality] = useState("");
  const [autherImage, setAutherImage] = useState("");
  const [gender, setGender] = useState("");
  const [id, setId] = useState();
  const [moreInfo, setMoreInfo] = useState({});
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



  function moreDetails(e, _id) {
    axios.get(`/api/auther/getAuther/${_id}`).then((res) => {
      setMoreInfo(res.data);

      // console.log(res.data);
    });
  }

  return (
    <div className="App">
      <div className="aCard">
        {authors.map((data) => {
          return (
            <div>
              <Row xs={1} md={4} className="g-3" d="flex">
                {Array.from({ length: 1 }).map((_, idx) => (
                  <Col>
                    <Card>
                      <Card.Img
                        className="img"
                        variant="top"
                        src={data.autherImage}
                      />
                      <Card.Body>
                        <Card.Title>{data.name}</Card.Title>
                        <Button
                          variant="warning"
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
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={(e) => deleteAuthor(e, data._id)}
                        >
                          Delete
                        </Button>{" "}
                        <Link to={`/AutherDetails/${data._id}`}>
                          <Button
                            variant="info"
                            onClick={(e) => moreDetails(e, data._id)}
                          >
                            More Info
                          </Button>{" "}
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {/* <Link to={`/AutherDetails/${data._id}`}>
              <button onClick={(e) => moreDetails(e, data._id)}>
                more info
              </button>
            </Link> */}
            </div>
          );
        })}
      </div>

      <div>
        
        {books.map((data) => {
          console.log(data.bookImage);
          return (
            <div>
              <img src={data.bookImage} style={{ height: "200px" }} />
              <h1>{data.title}</h1>
              <h2>{data.pages}</h2>
              <h3>{data.price}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Main;
