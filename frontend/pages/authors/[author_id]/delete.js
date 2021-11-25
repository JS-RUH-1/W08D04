import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function deleteAuthor(){
    const router = useRouter();
    const { author_id } = router.query
    const [details, setDetails] = useState(null);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        if(!author_id) return;

        axios.get(`authors/${author_id}`).then((res) => {
            setDetails(res.data);
           // get author details 
        });
    }, [author_id]);
    const deleteTheAuthor = () => {
        axios.delete(`authors/${author_id}`).then(() => {
            setDeleted(true);
        })
    }
    if(!details) return <div></div>;
    if(deleted) return <div className="container text-center">

        <h1>Deleted.</h1>
        <Link href={`/`}><button className="btn btn-lg btn-primary m-1">Go back</button></Link>

    </div>
    return <div className="container">

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link href="/#authors">Authors</Link></li>
                <li class="breadcrumb-item"><Link href={`/authors/${author_id}`}><>{details.name}</></Link></li>
                <li class="breadcrumb-item active" aria-current="page">Delete</li>
            </ol>
        </nav>

        <div className="text-center">
            <h1>Are you sure you want to delete {details.name} ?</h1>
            <button className="btn btn-lg btn-danger m-1" onClick={() => deleteTheAuthor()}> Yes delete it! </button>
            <Link href={`/authors/${author_id}`}><button className="btn btn-lg btn-primary m-1">Nooo!</button></Link>

        </div>

    </div>
}