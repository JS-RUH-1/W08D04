import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function author(){
    const router = useRouter();
    const { author_id } = router.query
    const [details, setDetails] = useState(null);
    useEffect(() => {
        if(!author_id) return;

        axios.get(`authors/${author_id}`).then((res) => {
            setDetails(res.data);
           // get author details 
        });
    }, [author_id])

    if(!details) return <div className="container">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    return <div className="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link href="/">authors</Link></li>
                <li class="breadcrumb-item active" aria-current="page">{details?.name}</li>
            </ol>
        </nav>

        <div class="row">
            <div class="col">
                <img src={details.image} />
            </div>
            <div class="col">
            <h2>{details.name}</h2> 
            <h2>Nationality: {details.nationality}</h2>
            <h2>Gender: {details.gender}</h2>
            <h2>Age: {details.age}</h2>

                <Link href={`/authors/${author_id}/edit`} passHref>
                  <a href="#" className="m-1 btn btn-warning">
                    Edit
                  </a>
                  </Link>
                  <Link href={`/authors/${author_id}/delete`} passHref>
                  <a href="#" className="m-1 btn btn-danger" >
                    Delete
                  </a>
                  </Link>
            </div>
        </div>
        
        
    </div>;
}