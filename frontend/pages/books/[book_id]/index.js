import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function Book(){
    const router = useRouter();
    const { book_id } = router.query
    const [details, setDetails] = useState(null);
    useEffect(() => {
        if(!book_id) return;

        axios.get(`books/${book_id}`).then((res) => {
            setDetails(res.data);
           // get book details 
        });
    }, [book_id])

    if(!details) return <div className="container">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    return <div className="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link href="/">Books</Link></li>
                <li class="breadcrumb-item active" aria-current="page">{details?.title}</li>
            </ol>
        </nav>

        <div class="row">
            <div class="col">
                <img src={details.image} />
            </div>
            <div class="col">
            <h2>{details.title}</h2> 
            <h2>Pages: {details.pages}</h2>
            <h2>Price: {details.price}</h2>
            {user?.books.some(b => b._id === book._id) ?
            
        <>
        <Link href={`/books/${book_id}/edit`} passHref>
                  <a href="#" className="m-1 btn btn-warning">
                    Edit
                  </a>
                  </Link>
                  <Link href={`/books/${book_id}/delete`} passHref>
                  <a href="#" className="m-1 btn btn-danger" >
                    Delete
                  </a>
                  </Link>
                  
        </>: <></>}
                
            </div>
        </div>
        
        
    </div>;
}