import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
function Author(props) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");

  const [nationality, setNationality] = useState("");
  const [image, setImage] = useState("");
  const [bookimage, setBookImage] = useState("");
  const [bookName, setbookName] = useState("");
  const [pages, setPages] = useState("");
  const [price, setPrice] = useState("");

  const [editId, setEditId] = useState("");

  const handelEditInfo = (e) => {
    setEditId(e._id);
    setName(e.name);
    setAge(e.age);
    setNationality(e.nationality);
    setGender(e.gender);
    setImage(e.image);
  };

  // const [name,setName] = useState("")
  const navigate = useNavigate();

  const fetchApi = () => {
    axios.get("http://localhost:8080/").then((res) => {
      setData(res.data);
      console.log("no data", res.data);
    });
  };

  useEffect(() => {
    fetchApi();
  }, []);
  const handelDelete = (id) => {
    axios.delete(`http://localhost:8080/${id}`);
    fetchApi();
  };
  const handelAdd = () => {
    const obj = {
      name: name,
      age: age,
      nationality: nationality,
      image: image,
      gender: gender,
      books: [
        { title: bookName, pages: pages, price: price, image: bookimage },
      ],
    };
    axios
      .post("http://localhost:8080/", obj)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post("http://localhost:8080/books", {
        title: bookName,
        pages: pages,
        price: price,
        image: bookimage,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handelEdit = () => {
    const obj = {
      name: name,
      age: age,
      nationality: nationality,
      image: image,
      gender: gender,
    };
    axios
      .put(`http://localhost:8080/${editId}`, obj)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setName("");
    setAge("");
    setNationality("");
    setGender("");
    setImage("");
  };

  const handleSelectChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="container">
      <div className="text-center">
        <button
          className="btn btn-primary btn-rounded m-4"
          data-toggle="modal"
          data-target="#modalContactForm"
        >
          Add Author & Book
        </button>
      </div>
      <div className="row">
        {data.map((e, i) => (
          <div className="col m-2" key={i}>
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={e.image}
                className="card-img-top"
                alt="..."
                height={300}
              />
              <div className="card-body">
                <h5 className="card-title">{e.name}</h5>
                <hr />
                <h6 className="card-text">Nationality: {e.nationality}</h6>
                <hr />
                <a
                  onClick={() => navigate(`/${e._id}`, { state: e })}
                  className="btn btn-primary m-2"
                >
                  Info
                </a>
                <a
                  onClick={() => handelDelete(e._id)}
                  className="btn btn-danger m-2"
                >
                  Delete
                </a>
                <a
                  onClick={() => handelEditInfo(e)}
                  className="btn btn-warning btn-rounded m-2"
                  data-toggle="modal"
                  data-target="#modalContactFormEdit"
                >
                  Edit
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="modalContactForm"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">Add Author</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body mx-3">
              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form34">
                  Author name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control validate"
                />
              </div>

              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form29">
                  Age
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="form-control validate"
                />
              </div>

              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form29">
                  Nationalty
                </label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="form-control validate"
                />
              </div>
              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form29">
                  image
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="form-control validate"
                />
              </div>

              <div className="md-form mb-4">
                <label
                  className="md-form m-1"
                  data-error="wrong"
                  data-success="right"
                  for="form8"
                >
                  Gender
                </label>
                <select value={gender} onChange={handleSelectChange}>
                  <option value="Male">Male</option>{" "}
                  <option value="Female">Female</option>
                </select>
              </div>
              <hr />
              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form8">
                  Book Name
                </label>
                <input
                  type="text"
                  value={bookName}
                  onChange={(e) => setbookName(e.target.value)}
                  className="form-control validate"
                />
              </div>
              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form8">
                  Book Image
                </label>
                <input
                  type="text"
                  value={bookimage}
                  onChange={(e) => setBookImage(e.target.value)}
                  className="form-control validate"
                />
              </div>
              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form8">
                  Pages
                </label>
                <input
                  type="text"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  className="form-control validate"
                />
              </div>
              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form8">
                  Price
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control validate"
                />
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handelAdd}
              >
                Send{" "}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalContactFormEdit"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">Add Author</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body mx-3">
              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form34">
                  Author name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control validate"
                />
              </div>

              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form29">
                  Age
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="form-control validate"
                />
              </div>

              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form29">
                  Nationalty
                </label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="form-control validate"
                />
              </div>
              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form29">
                  image
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="form-control validate"
                />
              </div>

              <div className="md-form mb-4">
                <label
                  className="md-form m-1"
                  data-error="wrong"
                  data-success="right"
                  for="form8"
                >
                  Gender
                </label>
                <select value={gender} onChange={handleSelectChange}>
                  <option value="Male">Male</option>{" "}
                  <option value="Female">Female</option>
                </select>
              </div>
              <hr />

              <div className="modal-footer d-flex justify-content-center">
                <button
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handelEdit}
                >
                  Save Changes{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Author;
