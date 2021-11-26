import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import Add from '../../components/addCompo/Add'


const Authers = () => {
    const [authers, setAllAuthers] = useState([])
    const [display, setDisplay] = useState(false)
    const [autherName, setAutherName] = useState('')
    const [age, setAge] = useState()
    const [nationality, setNationality] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState()

    useEffect(() => {
        const getAhuthers = async () => {
            const res = await axios.get("/author")
            setAllAuthers(res.data)
            console.log(res.data);
        }
        getAhuthers()
    }, [])


    const handleAddAuther = async () => {
        const newAuther = {
            name: autherName,
            age,
            nationality,
            gender,
            image
        }
        try {
            await axios.post('/author', newAuther)
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }
    


    return ( 
        <div>
            {authers.map((ele, index) => {
                return (
                    <div className="card mb-2 mt-5" key={index} >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <Link to={`/singleAuther/${ele._id}`}>
                                    <img src={ele.image} className="img-fluid rounded-start" alt="..." />
                                </Link>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <div>
                                        <h5 className="card-title">Name: {ele.name}</h5>
                                        <p className="card-text"></p>
                                        <p className="card-text"></p>
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
                  <label className="label">Name</label>
                  <input 
                    type="text"
                    onChange={(e) => setAutherName(e.target.value)}
                  />
                  <br />
                  <label className="label">Age</label>
                  <input 
                    type="number"
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <br /> 
                  <label className="label">Nationality</label>
                  <input 
                    type="text"
                    onChange={(e) => setNationality(e.target.value)}
                  />
                  <br /> 
                  <label className="label">Gender</label>
                  <input 
                    type="text"
                    onChange={e => setGender(e.target.value)}
                  />
                  <br /> 
                  <label className="label">Image</label>
                  <input 
                  type="text"
                  onChange={e => setImage(e.target.value)}
                  />
                  <br /> 
                  <input type="submit" value="Add Post" className="btn btn-primary" onClick={handleAddAuther}/>
                  <input type="submit" value="Cancle" className="btn btn-danger" onClick={() => setDisplay(false)}/>
                </div>
              ) : null}
        </div>
     );
}
 
export default Authers;