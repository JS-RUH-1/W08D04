import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function EditBook({user}){
    const router = useRouter();
    const { book_id } = router.query
    const [details, setDetails] = useState(null);
    const [savedAlert, setSavedAlert] = useState(false);
    useEffect(() => {
        if(!book_id) return;

        axios.get(`books/${book_id}`).then((res) => {
            setDetails(res.data);
           // get book details 
        });
    }, [book_id]);

    const saveChanges = (e) => {
        e.preventDefault();

        axios.put(`books/${book_id}`, details).then(res => {
            setSavedAlert(true);
        })
    }

    if(!details) return <div></div>;

    if(!user?.books.some(b => b._id === book_id)) return <h3> Not allowed to edit this book </h3>
    return <div className="container">
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link href="/">Books</Link></li>
                <li class="breadcrumb-item"><Link href={`/books/${book_id}`}>{details.title}</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Edit</li>
            </ol>
        </nav>


        <form>
            {savedAlert ? <div class="alert alert-success" role="alert">
  Changes has been saved successfuly.
</div> : <></>}
  <div class="mb-3">
    <label class="form-label">Title</label>
    <input type="text" class="form-control" value={details.title} onChange={(e) => setDetails({...details, title: e.target.value})} />
  </div>
  <div class="mb-3">
    <label class="form-label">Image</label>
    <input type="text" class="form-control" value={details.image} onChange={(e) => setDetails({...details, image: e.target.value})} />
  </div>
  <div class="mb-3">
    <label class="form-label">Pages</label>
    <input type="text" class="form-control" value={details.pages} onChange={(e) => setDetails({...details, pages: e.target.value})} />
  </div>
  <div class="mb-3">
    <label class="form-label">Price</label>
    <input type="text" class="form-control" value={details.price} onChange={(e) => setDetails({...details, price: e.target.value})} />
  </div>
 
  <button class="btn btn-primary" onClick={(e) => saveChanges(e)}>Submit</button>
</form>

    </div>
}