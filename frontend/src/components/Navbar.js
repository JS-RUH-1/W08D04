
import { Link } from "react-router-dom";
import {useContext } from "react"
import { ContextStore } from "../context";

export default function Navbar() {
const { author , setAuthor} = useContext(ContextStore);

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    <div className="relative flex items-center justify-between">
     
      <div className="flex items-center">
        <Link
          to=""
          className="inline-flex items-center mr-8"
        >
          <svg
            className="w-8  text-pink-700"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            stroke="currentColor"
            fill="none"
          >
            <rect x="3" y="1" width="7" height="12" />
            <rect x="3" y="17" width="7" height="6" />
            <rect x="14" y="1" width="7" height="6" />
            <rect x="14" y="11" width="7" height="12" />
          </svg>
          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
            Library
          </span>
        </Link>
        <ul className="flex items-center hidden space-x-8 lg:flex">
          <li>
            <Link
              to="/books"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-pink-700"
            >
              Books
            </Link>
          </li>
          <li>
            <Link
              to="/authors"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-pink-700"
            >
              Authors
            </Link>
          </li>
        </ul>
      </div>
    
    
      <ul className="flex items-center  space-x-8 lg:flex">
      {author ? <>
        <li>
          <Link
            to=""
            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-pink-700"
          > Hello {author.name} </Link> </li>    
        <li>
          <Link
            to=""
            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-pink-700"
            onClick={() =>{
              setAuthor(undefined);
              localStorage.removeItem("auth");
            }}
          > Logout </Link> </li>
        </> : <>
        <li>
          <Link
          to="/login"
            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-pink-700 hover:bg-pink-200 focus:shadow-outline focus:outline-none"
          >
            Login
          </Link>
        </li>

        <li>
          <Link
          to="/signup"
            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-pink-700 hover:bg-pink-200 focus:shadow-outline focus:outline-none"
          >
            Regester
          </Link>
        </li>
        </>}
      </ul>
    </div>
  </div>

  );
}
