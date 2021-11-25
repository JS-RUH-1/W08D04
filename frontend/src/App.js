import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [resource, setResource] = useState("book");
  const [items, setItems] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:8080/${resource}`).then((response) => {
      console.log(response.data);
      setItems(response.data);
    });
  }, [resource]);

  const deleteItem = (title) => {
    Axios.delete(`http://localhost:8080/${resource}/${title}`).then((res) => {
      console.log(res.data);
      setItems(res.data)
    });
    // console.log("Clicked")
  };

  const addBook = (e) => {
    e.preventDefault();
    console.log(e.target.form[0].value);
    const title = e.target.form[0].value;
    const pages = e.target.form[1].value;
    const image = e.target.form[2].value;
    
    Axios
      .post(`http://localhost:8080/${resource}`, {
        title: title,
        pages: pages,
        image: image
      })
      .then((res) => {
        console.log(res.data);
        setItems(res.data)
      });
  };

  return (
    <div className="App">
      <header className="App-header ">
        <div>
          <button
            id="resource"
            className="btn btn-dark"
            onClick={() => setResource("book")}
          >
            Book
          </button>
          <button
            id="resource"
            className="btn btn-dark"
            onClick={() => setResource("author")}
          >
            Author
          </button>

          <div class="container">
            <div className="row">
              <form>
                <label for="exampleFormControlInput1" class="form-label">
                  Book Title
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="e.g. The Hound of the Baskervilles"
                />
                <label for="exampleFormControlInput1" class="form-label">
                  Pages
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="e.g. 700"
                />
                <label for="exampleFormControlInput1" class="form-label">
                  Image (URL)
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="htttp://www.example.jpg"
                />
                <button className="btn btn-success" onClick={(e) => addBook(e)}>
                  Add Book
                </button>
              </form>
              {resource == "book"
                ? items.map((e) => (
                    <div className="col-lg-3 p-3">
                      <div class="card">
                        <img
                          class="card-img-top img-book"
                          src={e?.image}
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <h5 class="card-title">{e?.title}</h5>
                          <button
                            onClick={() => deleteItem(e?.title)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                : items.map((e) => (
                    <div className="col-lg-3 p-3">
                      <div class="card">
                        <img
                          class="card-img-top img-author"
                          src={e?.image}
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <h5 class="card-title">{e?.name}</h5>
                          <button
                            onClick={() => deleteItem(e?.name)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
