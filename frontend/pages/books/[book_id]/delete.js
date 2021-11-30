import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function deleteBook({user}){
    const router = useRouter();
    const { book_id } = router.query
    const [details, setDetails] = useState(null);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        if(!book_id) return;

        axios.get(`books/${book_id}`).then((res) => {
            setDetails(res.data);
           // get book details 
        });
    }, [book_id]);
    const deleteTheBook = () => {
        axios.delete(`books/${book_id}`).then(() => {
            setDeleted(true);
        })
    }
    if(!details) return <div></div>;
    if(deleted) return <div className="container text-center">

        <h1>Deleted.</h1>
        <Link href={`/`}><button className="btn btn-lg btn-primary m-1">Go back</button></Link>

    </div>;

    if(!user?.books.some(b => b._id === book_id)) return <h3> Not allowed to edit this book </h3>

    return <div className="container">

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link href="/">Books</Link></li>
                <li class="breadcrumb-item"><Link href={`/books/${book_id}`}>{details?.title}</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Delete</li>
            </ol>
        </nav>

        <div className="text-center">
            <h1>Are you sure you want to delete {details.title} ?</h1>
            <button className="btn btn-lg btn-danger m-1" onClick={() => deleteTheBook()}> Yes delete it! </button>
            <Link href={`/books/${book_id}`}><button className="btn btn-lg btn-primary m-1">Nooo!</button></Link>

        </div>

    </div>
}