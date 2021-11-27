import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/books").then((res) => {
      console.log(res.data);
      setBooks(res.data);
    });
  }, []);

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid  gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book) => (
          <div className="transition duration-300 transform bg-white rounded shadow-sm hover:-translate-y-1 hover:shadow md:text-center">
            <div className="relative">
              <img
                className="object-cover w-full h-64 rounded-t lg:h-80 xl:h-96"
                src={book.image}
                alt=""
              />
              <div className="absolute inset-0 bg-gray-800 bg-opacity-25" />
            </div>
            <div className="px-6 py-8 border border-t-0 rounded-b sm:px-8">
              <h5 className="mb-2 text-xl font-bold leading-none sm:text-2xl">
                {book.title}
              </h5>
              <p className="mb-5 text-gray-700">
                Pages: {book.pages} | Price:{book.price} SAR
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-pink-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                Edit
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-pink-700 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
