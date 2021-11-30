import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function AddBook({user, setUser}){
    const router = useRouter();
    const { book_id } = router.query
    const [details, setDetails] = useState({
        title: "",
        image: "",
        price: "",
        pages: ""
      });
    const [savedAlert, setSavedAlert] = useState(false);

    const saveChanges = (e) => {
        e.preventDefault();

        axios.post(`books`, details).then(res => {
            setSavedAlert({class:"success", message:"Changes has been saved successfuly."});
            setUser({...user,books:[...user.books, res.data]}); // add book to user cache.
            setTimeout(() => {
              router.push(`/books/${res.data._id}`)
            }, 1000);
        }).catch(err => {
            setSavedAlert({class:"danger", message: err.response.data.message
        });

        })
    }

    if(!user) return <div className="container">
    You have to login..
    </div>;

    if(!details) return <div></div>;

    return <div className="container">
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link href="/#books">Books</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Add</li>
            </ol>
        </nav>


        <form>
            {savedAlert ? <div class={`alert alert-${savedAlert.class}`} role="alert">
  {savedAlert.message} 
</div> : <></>}
  <div class="mb-3">
    <label class="form-label">title</label>
    <input type="text" class="form-control" value={details.title} onChange={(e) => setDetails({...details, title: e.target.value})} />
  </div>
  <div class="mb-3">
    <label class="form-label">Image</label>
    <input type="text" class="form-control" value={details.image} onChange={(e) => setDetails({...details, image: e.target.value})} />
  </div>
  <div class="mb-3">
    <label class="form-label">Number of Pages</label>
    <input type="number" class="form-control" value={details.pages} onChange={(e) => setDetails({...details, pages: e.target.value})} />
  </div>
  <div class="mb-3">
    <label class="form-label">Price</label>
    <input type="number" class="form-control" value={details.price} onChange={(e) => setDetails({...details, price: e.target.value})} />
  </div>
 
  <button class="btn btn-primary" onClick={(e) => saveChanges(e)}>Submit</button>
</form>

    </div>
}