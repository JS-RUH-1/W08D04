import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function UserBooks(){
    const[data, setData] = useState([""]);
    const[state, setState] = useState({})
    const[state2, setState2] = useState({title:"", pages:"", price:""})
    useEffect(() => {
        axios.get('http://localhost:4000/userBooks')
        .then(data => setData(data.data))
        .catch((err) => console.log(err))
    },[])

    function cancelUpdate(i){
        let new_state = state;
        delete new_state[i]
        setState(new_state);

    }

    if(data[0]){
        return (
            <div className="container mt-5">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {
                        data.map((i, index) => {
                            return (
                                <div key={index} className="col">
                                    <div className="card h-100 shadow">
                                        <img src={i.image} alt={i.title} className="card-img-top mx-auto" style={{width: "200px"}}/>
                                        <div className="card-body">
                                            <div className="card-title">{i.title}</div>
                                            <div className="card-text">{`Pages: ${i.pages}`}</div>
                                            <div className="card-text">{`Price: ${i.price}`}</div>
                                            <form method="post" action="http://localhost:4000/deleteBook" className="d-flex justify-content-between mt-3">
                                                <input type="text" name="bookId" value={i._id} hidden/>
                                                <button type="button" className="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#updateModal"
                                                onClick={()=>{setState({id:i._id, title:i.title, pages:i.pages, price:i.price, image: i.image})}}>Update</button>
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
                                <form method="post" action="http://localhost:4000/updateBook">
                                    <input type="text" name="bookId" value={state.id} hidden/>
                                    <label for="title" className="form=label">Title:</label>
                                    <input type="text" name="title" className="form-control form-control-sm" 
                                    onInput={(e)=>{setState({...state,title:e.target.value})}} value={state.title}/>
                                    <label for="pages" className="form=label">Pages:</label>
                                    <input type="number" name="pages" className="form-control form-control-sm" 
                                    onInput={(e)=>{setState({...state,pages:e.target.value})}} value={state.pages}/>
                                    <label for="price" className="form=label">Price:</label>
                                    <input type="number" name="price" className="form-control form-control-sm" 
                                    onInput={(e)=>{setState({...state,price:e.target.value})}} value={state.price}/>
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
    }else{
        return (
            <div className="container mt-5 ">
                <div className="container text-center pt-5">
                    <div className="container text-center pt-5">
                        <h4>No books here</h4>
                        <Link to="/" className="text-decoration-none">Go back to home</Link>
                    </div> 
                </div> 
            </div>
        )
    }
    
}

export {UserBooks}