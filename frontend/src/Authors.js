import axios from 'axios';
import {useState, useEffect} from 'react';

function Authors(){
    const[data, setData] = useState([{books:[]}]);
    const[state, setState] = useState({})
    //const[state2, setState2] = useState({name:"", age:"", nationality:"", image: "",books:[] })
    useEffect(() => {
        axios.get('http://localhost:4000/getAuthors')
        .then(data => {setData(data.data)})
        .catch((err) => console.log(err));
    },[])
    return (
        <div className="container mt-5 mb-3">
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {
                    data.map((i, index) => {
                        return (
                            <div key={index} className="col">
                                <div className="card h-100">
                                    <img src={i.image} alt={i.name} className="card-img-top mx-auto" style={{height: "200px"}} />
                                    <div className="card-body">
                                        <h5 className="card-title mb-4">{i.name}</h5>
                                        <p className="card-text"><b>Nationality: </b>{i.nationality}</p>
                                        <p className="card-text"><b>Age: </b>{i.age}</p>
                                        <b>Books:</b>
                                        <ul>
                                            {
                                                
                                                (i.books).map((i, index) => {
                                                    return (
                                                        <li key={index}>{i.title}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        

                                    </div>
                                    <div className="card-footer bg-white border-0">
                                    <form method="post" action="http://localhost:4000/deleteAuthor" className="d-flex justify-content-between mt-3">
                                            <input type="text" name="bookId" value={i._id} hidden/>
                                            <button type="button" className="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#updateModal"
                                            onClick={()=>{setState({id:i._id, name:i.name, age:i.age, nationality:i.nationality, image: i.image})}}>Update</button>
                                            <button type="submit" className="btn btn-sm btn-danger" >Delete</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="modal fade" id="updateModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal_header">
                                <h5 className="modal-title"></h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <form method="post" action="http://localhost:4000/updateAuthor">
                                    <input type="text" name="authorId" value={state.id} hidden/>
                                    <label for="name" className="form=label">Name:</label>
                                    <input type="text" name="name" className="form-control form-control-sm" 
                                    onInput={(e)=>{setState({...state,name:e.target.value})}} value={state.name}/>
                                    <label for="age" className="form=label">Age:</label>
                                    <input type="number" name="age" className="form-control form-control-sm" 
                                    onInput={(e)=>{setState({...state,age:e.target.value})}} value={state.age}/>
                                    <label for="nationality" className="form=label">Nationality:</label>
                                    <input type="text" name="nationality" className="form-control form-control-sm" 
                                    onInput={(e)=>{setState({...state,nationality:e.target.value})}} value={state.nationality}/>
                                    <label for="image" className="form=label">Image Url:</label>
                                    <input type="text" name="image" className="form-control form-control-sm" 
                                    onInput={(e)=>{setState({...state,image:e.target.value})}} value={state.image}/>
                                    <div className="d-flex justify-content-end mt-2">
                                        <button type="submit" className="btn btn-sm btn-success">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
        </div>
    )
}

export {Authors};