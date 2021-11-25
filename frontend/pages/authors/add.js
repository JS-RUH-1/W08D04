import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function AddAuthor(){
    const router = useRouter();
    const { author_id } = router.query
    const [details, setDetails] = useState({
        name: "",
        gender: "",
        age: "",
        image: "",
        nationality: ""
    });
    const [savedAlert, setSavedAlert] = useState(false);

    const saveChanges = (e) => {
        e.preventDefault();

        axios.post(`authors`, details).then(res => {
            setSavedAlert({class:"success", message:"Changes has been saved successfuly."});
        }).catch(err => {
            setSavedAlert({class:"danger", message: err.response.data.message
        });

        })
    }

    if(!details) return <div></div>;

    return <div className="container">
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link href="/#authors">Authors</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Add</li>
            </ol>
        </nav>


        <form>
            {savedAlert ? <div class={`alert alert-${savedAlert.class}`} role="alert">
  {savedAlert.message} 
</div> : <></>}
  <div class="mb-3">
    <label class="form-label">name</label>
    <input type="text" class="form-control" value={details.name} onChange={(e) => setDetails({...details, name: e.target.value})} />
  </div>
  <div class="mb-3">
    <label class="form-label">Image</label>
    <input type="text" class="form-control" value={details.image} onChange={(e) => setDetails({...details, image: e.target.value})} />
  </div>
  <div class="mb-3">
    <label class="form-label">Nationality</label>
    <input type="text" class="form-control" value={details.nationality} onChange={(e) => setDetails({...details, nationality: e.target.value})} />
  </div>
  <div class="mb-3">
    <label class="form-label">Gender</label>
    <input type="text" class="form-control" value={details.gender} onChange={(e) => setDetails({...details, gender: e.target.value})} />
  </div>
  <div class="mb-3">
    <label class="form-label">age</label>
    <input type="number" class="form-control" value={details.age} onChange={(e) => setDetails({...details, age: e.target.value})} />
  </div>
 
  <button class="btn btn-primary" onClick={(e) => saveChanges(e)}>Submit</button>
</form>

    </div>
}