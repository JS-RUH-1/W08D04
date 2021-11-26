import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {useNavigate} from 'react-router-dom'


const SingleBook = () => {
    const location = useLocation()
    const path = location.pathname.split('/')[2];
    const [book, setBook] = useState({})
    const [updateState, setUpdateState] = useState(false)
    const [title, setTitle] = useState('')
    const [pages, setPages] = useState(0)
    const [price, setPrice] = useState(0)
    const navigation = useNavigate();


    useEffect(() => {
        const getSingleBook = async () => {
            const res = await axios.get("/books/" + path)
            setBook(res.data)
            setTitle(res.data.title)
            setPages(res.data.pages)
            setPrice(res.data.price)
            console.log(res.data);
        }
        getSingleBook()
    }, [path])


    const handleUpdate = async (id) => {
        try {
            await axios.put(`/books/${id}`, {title, pages, price})
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/books/${id}`)
            navigation('/')
        } catch (err) {
            console.log(err);
        }
    }

    return (
      <div className="card mb-2 mt-5">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={book.image}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div>
                {updateState ? (
                  <div>
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPages"
                          className="form-label"
                        >
                          Pages
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleInputPages"
                          value={pages}
                          onChange={e => setPages(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPrice"
                          className="form-label"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleInputPrice"
                          value={price}
                          onChange={e => setPrice(e.target.value)}
                        />
                      </div>
                    </form>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdate(book._id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setUpdateState(false)}
                    >
                      Cancle
                    </button>
                  </div>
                ) : (
                  <div>
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">Pages: {book.pages}</p>
                    <p className="card-text">Price: {book.price}</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setUpdateState(true)}
                    >
                      Edit Book
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(book._id)}>
                      Delete Book
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SingleBook;