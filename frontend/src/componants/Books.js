import { useState, useEffect } from "react";
import axios from "axios";
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
import "bootstrap/dist/css/bootstrap.min.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [title,setTitle] = useState('')
  const [pages , setPages] = useState()
  const [price , setPrice] = useState()
  const [id, setId] = useState();
  const [bookImage, setBookImage] = useState("");

  useEffect(() => {
    axios.get("/api/book/getBook").then((res) => {
    //   console.log(res.data);
      setBooks(res.data);
    });
  }, []);

//   Post
  function postBook(e){
      e.preventDefault();

    axios
    .post("/api/book/postBook",{
        title :title,
        pages:pages,
        price:price,
        bookImage:bookImage
    })
    .then((res)=>{
        setBooks(res.data);
    })

  }
// edit
  function editBook(e,id, title, pages, price, bookImage) {
    e.preventDefault();
    setEditMode(true);
    setId(id);
    setTitle(title);
    setPages(pages);
    setPrice(price);
    setBookImage(bookImage);

  }
//   save
  function saveData(e){
      e.preventDefault();
      axios
        .put(`http://localhost:3001/api/book/editBook/${id}`,{
            title : title,
            price : price,
            pages :pages,
            bookImage:bookImage
        })
        .then((res)=>{
            setBooks(res.data)
            setEditMode(false)
        })

  }
  
  function deleteBook(e, _id) {
    e.preventDefault();
    console.log(_id);
    axios.delete(`/api/book/deleteBook/${_id}`).then((res) => {
      console.log(res.data);
      setBooks(res.data);
    });
  }

  return (
    <div>
      {books.map((data) => {
        // console.log(data.bookImage);
        return (
          <div>
            <Row xs={1} md={4} className="g-3" d="flex">
              {Array.from({ length: 1 }).map((_, idx) => (
                <Col>
                  <Card>
                    <Card.Img
                      className="img"
                      variant="top"
                      src={data.bookImage}
                    />
                    <Card.Body>
                      <Card.Title> Title: {data.title}</Card.Title>
                      <Card.Title> Pages: {data.pages}</Card.Title>
                      <Card.Title> Price: {data.price}</Card.Title>
                      <Button
                          variant="warning"
                          onClick={(e) =>
                            editBook(
                              e,
                              data._id,
                              data.title,
                              data.pages,
                              data.price,
                              data.bookImage,
                              data.gender
                            )
                          }
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={(e) => deleteBook(e, data._id)}
                        >
                          Delete
                        </Button>{" "}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );
      })}

<form>
          <label>Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
          <label>Pages</label>
          
          <input
            type="number"
            onChange={(e) => setPages(e.target.value)}
            value={pages}
          ></input>

          <label>Price</label>
          <input
            value={price}
            type="text"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <label>Image</label>
          <input
            type="text"
            value={bookImage}
            onChange={(e) => setBookImage(e.target.value)}
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
            value="Add Book"
            onClick={(e) => postBook(e)}
          ></input>
        </form>
    </div>
  );
}
export default Books;
