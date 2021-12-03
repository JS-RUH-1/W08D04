import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from 'react-router';

export default function Details() {
  
    const [DAuthor, setDAuthor] = useState()
    const [Loding, setLoding] = useState(true)
   const {id} = useParams()

    useEffect(() => {
        axios
        .get(`http://localhost:3001/author/authorDetails/${id}`)
        .then((res) => {console.log(res);
        setDAuthor(res.data)
        setLoding(false)
    })
      }, []);

      if(Loding){
          return (<p>Loding</p>)
      }
    return (
        <div>
           <div className="authors-cards">
              <img src={DAuthor.image} height="200px" width="200px" />
              <p>{DAuthor.name}</p>
              <p>{DAuthor.age}</p>
              <p>{DAuthor.nationality}</p>
              <p>{DAuthor.gender}</p>


            {DAuthor.books.map((b)=>{
                return <div>
                <img src={b.image}/>
                 <p>{b.title}</p>
                 <p>{b.price}</p>
                 <p>{b.pages}</p>

                </div>
              })}

            </div>
        </div>
    )
}
