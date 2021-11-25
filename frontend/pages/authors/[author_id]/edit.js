import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function EditAuthor(){
    const router = useRouter();
    const { author_id } = router.query
    const [details, setDetails] = useState(null);
    const [savedAlert, setSavedAlert] = useState(false);
    useEffect(() => {
        if(!author_id) return;

        axios.get(`authors/${author_id}`).then((res) => {
            setDetails(res.data);
           // get author details 
        });
    }, [author_id]);

    const saveChanges = (e) => {
        e.preventDefault();

        axios.put(`authors/${author_id}`, details).then(res => {
            setSavedAlert(true);
        })
    }

    if(!details) return <div></div>;

    return <div className="container">
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link href="/#authors">Authors</Link></li>
                <li class="breadcrumb-item"><Link href={`/authors/${author_id}`}><a href="#">{details.name}</a></Link></li>
                <li class="breadcrumb-item active" aria-current="page">Edit</li>
            </ol>
        </nav>


        <form>
            {savedAlert ? <div class="alert alert-success" role="alert">
  Changes has been saved successfuly.
</div> : <></>}
  <div class="mb-3">
    <label class="form-label">name</label>
    <input type="text" class="form-control" value={details.name} onChange={(e) => setDetails({...details, name: e.target.value})} />
  </div>
  <div class="mb-3">
    <label class="form-label">Nationality</label>
    <input type="text" class="form-control" value={details.nationality} onChange={(e) => setDetails({...details, image: e.target.value})} />
  </div>
  <div class="mb-3">
    <label class="form-label">Gender</label>
    <input type="text" class="form-control" value={details.gender} onChange={(e) => setDetails({...details, gender: e.target.value})} />
  </div>
  <div class="mb-3">
    <label class="form-label">age</label>
    <input type="text" class="form-control" value={details.age} onChange={(e) => setDetails({...details, age: e.target.value})} />
  </div>
 
  <button class="btn btn-primary" onClick={(e) => saveChanges(e)}>Submit</button>
</form>

    </div>
}