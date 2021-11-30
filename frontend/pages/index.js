import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Home({user}) {
  const [active, setActive] = useState("books");
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    Promise.all([axios.get("books"), axios.get("authors")]).then((res) => {
      setBooks(res[0].data);
      setAuthors(res[1].data);
    });
    if(window.location.hash === "#authors") {
      setActive("authors")
    }
  }, []);
  
  if (typeof window !== "undefined") {
    useEffect(() => {
      if(window.location.hash === "#authors") {
        setActive("authors")
      } else {
        setActive("books")
      }
    },[window.location.hash]);
  }

  return (
    <div className="container">
      {active === "books" ?
       <Link href="/books/add"><button className="btn btn-primary m-3">Add Book</button></Link>
      :<></>
      }
      <div class="row row-cols-sm-2 row-cols-md-4">
        {active === "books" ? (
          <>
            {books.map((book) => (
              <div key={book._id} className=" col card">
                <img src={book.image} style={{width:"200px", height: "200px"}} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    Pages: {book.pages}
                  </p>
                  <Link href={`/books/${book._id}`}>
                    <button  className="m-1 btn btn-primary">View</button> 
                  </Link>
                  {user?.books.some(b => b._id === book._id) ? <>
                    <Link href={`/books/${book._id}/edit`}>
                  <a href="#" className="m-1 btn btn-warning">
                    Edit
                  </a>
                  </Link>
                  <Link href={`/books/${book._id}/delete`}>
                  <a href="#" className="m-1 btn btn-danger" >
                    Delete
                  </a>
                  </Link>
                  </>
                  : <></>}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
           {authors.map((author) => (
              <div key={author._id} className=" col card">
                <img src={author.image} style={{width:"200px", height: "200px"}} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{author.name}</h5>
                  <p className="card-text">
                    Nationality : {author.nationality}
                  </p>
                  <Link href={`/authors/${author._id}`}>
                    <button  className="m-1 btn btn-primary">View</button> 
                  </Link>

                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
