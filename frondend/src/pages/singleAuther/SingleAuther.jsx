import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";


const SingleAuther = () => {
    const location = useLocation()
    const path = location.pathname.split('/')[2];
    const [auther, setAuther] = useState({})
    const [auherBooks, setAutherBooks] = useState([])
    const [updateState, setUpdateState] = useState(false)
    const [autherName, setAutherName] = useState('')
    const [age, setAge] = useState()
    const [nationality, setNationality] = useState('')
    const [gender, setGender] = useState('')
    const navigation = useNavigate();

    useEffect(() => {
        const getSingleAuther = async () => {
            const res = await axios.get("/author/" + path)
            console.log(res.data);
            setAuther(res.data)
            setAutherName(res.data.name)
            setAge(res.data.age)
            setNationality(res.data.nationality)
            setGender(res.data.gender)
            setAutherBooks(res.data.books)
        }
        getSingleAuther()
    }, [path])

    
    const handleUpdate = async (id) => {
        try {
            await axios.put(`/author/${id}`, {name:autherName, age, nationality, gender})
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/author/${id}`)
            navigation('/')
        } catch (err) {
            console.log(err);
        }
    }


    return ( 
        <div>
            <div className="card mb-2 mt-5">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={auther.image}
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
                                                <label htmlFor="exampleInputName" className="form-label">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputName"
                                                    aria-describedby="emailHelp"
                                                    value={autherName}
                                                    onChange={e => setAutherName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputAge" className="form-label">
                                                    Age
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="exampleInputAge"
                                                    value={age}
                                                    onChange={e => setAge(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputNationality" className="form-label">
                                                    Nationality
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputNationality"
                                                    value={nationality}
                                                    onChange={e => setNationality(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputGender" className="form-label">
                                                    Gender
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputGender"
                                                    value={gender}
                                                    onChange={e => setGender(e.target.value)}
                                                />
                                            </div>
                                        </form>
                                        <button className="btn btn-primary" onClick={() => handleUpdate(auther._id)}>
                                            Update
                                        </button>
                                        <button className="btn btn-danger" onClick={() => setUpdateState(false)}>
                                            Cancle
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <h5 className="card-title">Auther Name: {auther.name}</h5>
                                        <p className="card-text">Age: {auther.age}</p>
                                        <p className="card-text">Nationality: {auther.nationality}</p>
                                        <p className="card-text">Gender: {auther.gender}</p>
                                        <button type="button" className="btn btn-primary" onClick={() => setUpdateState(true)}>
                                            Edit Auther
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(auther._id)}>
                                            Delete Auther
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <h2 style={{color: '#fff'}}>All Books for this Auther</h2>

            <div className="card-group">
                {auherBooks.map((ele, index) => {
                    return (
                        <div className="card" key={index}>
                            <img src={ele.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{ele.title}</h5>
                                <p className="card-text">Pages: {ele.pages}</p>
                                <p className="card-text">Price: {ele.price}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default SingleAuther;