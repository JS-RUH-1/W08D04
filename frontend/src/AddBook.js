import axios from 'axios';

function AddBook(){
    return(
        <div className="container mt-5 py-3 rounded shadow" id="rc">
            <h5 className="text-center mb-4">Add a book</h5>
            <form method="post" action="http://localhost:4000/addBook">
                <label for="title" className="form-label">Book title:</label>
                <input type="text" name="title" className="form-control" required/>
                <label for="pages" className="form-label mt-2">Pages:</label>
                <input type="number" name="pages" className="form-control" min="0" required/>
                <label for="price" className="form-label mt-2">Price</label>
                <input type="number" name="price" className="form-control" min="0" required/>
                <label for="image" className="form-label mt-2">Image Url:</label>
                <input type="text" name="image" className="form-control" required/>
                <div className="d-flex justify-content-end">
                    <input type="submit" className="btn btn-warning text-dark fw-bold mt-3" value="Add"/>
                </div>
            </form>
        </div>
    )
}


export {AddBook};