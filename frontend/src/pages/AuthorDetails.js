import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams,Link  } from "react-router-dom";
function AuthorDetails() {
    const { authid } = useParams();
    const [authorDetails, setAuthorDetails] = useState({});


    useEffect(() => {
        axios.get(`http://localhost:3000/authors/${authid}`)
        .then((res) => {
          console.log(res.data);
          setAuthorDetails(res.data);
        });
      }, []);
      if (!Object.keys(authorDetails).length) return <div>Loading</div>;
    return ( 
        <>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="mx-auto mb-10 lg:max-w-xl sm:text-center">
          <p className="inline-block px-3 py-px mb-4 text-xl font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-pink-200">
            {authorDetails.author.name}'s Books
          </p>
          {/* <p className="text-base text-gray-700 md:text-lg">
        
          </p> */}
        </div>
        <div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
        
        {(authorDetails.author.books).map((book)=> (
                    
                
              <div>
            <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
              <img
                className="absolute object-cover w-full h-full rounded"
                src={book.image}
                alt="Person"
              />
            </div>
            <div className="flex flex-col sm:text-center">
              <p className="text-lg font-bold">{book.title}</p>
              <p className=" text-xs text-gray-800">Pages: {book.pages} </p>
              <p className="mb-5 text-xs text-gray-800">Price: {book.price} SAR</p>

              <div className="flex items-center space-x-3 sm:justify-center">
              
                {/* <a
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                  </svg>
                </a> */}
              </div>
            </div>
          </div>
))}

        </div>
      </div>

</>
     );
}

export default AuthorDetails;