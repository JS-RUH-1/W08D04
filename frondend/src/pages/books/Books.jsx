import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './books.css'
import Add from '../../components/addCompo/Add'

const Content = () => {
    const [books, setBooks] = useState([])
    const [display, setDisplay] = useState(false)
    const [title, setTitle] = useState('')
    const [pages, setPages] = useState(0)
    const [price, setPrice] = useState(0)
    const [img, setImag] = useState()

    useEffect(() => {
        const getBooks = async () => {
            const res = await axios.get("/books")
            setBooks(res.data)
            console.log(res.data);
        }
        getBooks()
    }, [])


    const handleAddBook = async () => {
        const newBook = {
            title,
            pages,
            price,
            image: img
        }
        try {
            await axios.post('/books', newBook)
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }
    
    return ( 
        <div>
            {books.map((ele, index) => {
                return (
                    <div className="card mb-2 mt-5" key={index} >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <Link to={`singleBook/${ele._id}`}>
                                    <img src={ele.image} className="img-fluid rounded-start" alt="..." />
                                </Link>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <div>
                                        <h5 className="card-title">{ele.title}</h5>
                                        <p className="card-text">Pages: {ele.pages}</p>
                                        <p className="card-text">Price: {ele.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}



           <div onClick={() => setDisplay(true)}>
            <Add />
           </div>

            {display ? (
                <div className="formSection">
                  <label className="label">Title</label>
                  <input 
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <br />
                  <label className="label">Pages</label>
                  <input 
                    type="number"
                    onChange={(e) => setPages(e.target.value)}
                  />
                  <br /> 
                  <label className="label">Price</label>
                  <input 
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <br /> 
                  <label className="label">Image</label>
                  <input 
                    type="text"
                    onChange={e => setImag(e.target.value)}
                  />
                  <br /> 
                  <input type="submit" value="Add Post" className="btn btn-primary" onClick={handleAddBook}/>
                  <input type="submit" value="Cancle" className="btn btn-danger" onClick={() => setDisplay(false)}/>
                </div>
              ) : null}
        </div>
     );
}
 
export default Content;