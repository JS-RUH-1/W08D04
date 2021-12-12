import axios from 'axios';

function AddAuthor(){
    return(
        <div className="container mt-4 py-3 rounded shadow" id="rc">
            <h5 className="text-center mb-4">Add an author</h5>
            <form method="post" action="http://localhost:4000/addAuthor">
                <label for="name" className="form-label">Name:</label>
                <input type="text" name="name" className="form-control" required/>
                <label for="nation" className="form-label mt-2">Nationality</label>
                <input type="text" name="nation" className="form-control" required/>
                <label for="gender" className="form-label mt-2">Gender:</label>
                <input type="text" name="gender" className="form-control" required/>
                <label for="age" className="form-label mt-2">Age:</label>
                <input type="number" name="age" className="form-control" min="0" required/>
                <label for="image" className="form-label mt-2">Image URL:</label>
                <input type="text" name="image" className="form-control" required/>
                <div className="d-flex justify-content-end">
                    <input type="submit" className="btn btn-warning text-dark fw-bold mt-3" value="Add"/>
                </div>
            </form>
        </div>
    )
}


export {AddAuthor};