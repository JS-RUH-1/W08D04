import Swal from "sweetalert2";
import axios from "axios";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

function AddBooktoAuthor() {
    const navigate = useNavigate();
    const [Books, setBooks] = useState([]);
    const [newBookInfo, setNewBookInfo] = useState({
        title:'',
        image:'',
        price:0,
        pages:0
    });
    function handleAddNewBook() {
        axios.post("http://localhost:3000/books/create", newBookInfo)
          .then((res) => {
            setBooks(res.data);
            setNewBookInfo({
              title: "",
              image: "",
              price: 0,
              pages: 0,
            });
          })
          Swal.fire({
            title: "New book has been added to the library",
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didClose: () => {
             navigate("/books");
            }})
          
     
      }
    return ( 

        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <section className=" text-darkblue body-font relative">
          <div className="max-w-xl mb-6 md:mx-auto sm:text-center lg:max-w-2xl md:mb-">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-purple1 uppercase rounded-full bg-pink-200">
                New Book
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-darkblue sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-purpule2 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="84d09fa9-a544-44bd-88b2-08fdf4cddd38"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#84d09fa9-a544-44bd-88b2-08fdf4cddd38)"
                    width="52"
                    height="24"
                  />
                </svg>
                <span className="relative">Add Book</span>
              </span>
            </h2>
            {/* <p className=" text-darkblue">
              We’re excited to talk to you! Fill out the form below and we’ll be
              in touch.
            </p> */}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddNewBook();
            }}
          >
  
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label for="title" className="leading-7 text-sm  font-bold">
                      Book's Title 
                    </label>
                    <input
                      type="text"
                      required
                      id="title"
                      name="title"
                      defaultValue={newBookInfo.title}
                      className="w-full bg-gray-50 rounded border border-graylight focus:border-indigo-500 text-base outline-none text-gray py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e)=>{newBookInfo.title = e.target.value;
                    setNewBookInfo({...newBookInfo})
                    }}
                    />
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label for="pages" className="leading-7 text-sm font-bold">
                      Pages Number:
                    </label>
                    <input
                      type="text"
                      required
                      id="pages"
                      name="pages"
                      defaultValue={newBookInfo.pages}
                      className="w-full bg-gray-50 rounded border border-graylight focus:border-indigo-500 text-base outline-none text-gray py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e)=>{newBookInfo.pages = e.target.value;
                        setNewBookInfo({...newBookInfo})
                        }}
                    />
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label for="price" className="leading-7 text-sm font-bold">
                      Price:
                    </label>
                    <input
                      id="price"
                      name="price"
                      required
                      defaultValue={newBookInfo.price}

                      className="w-full bg-gray-50 rounded border border-graylight focus:border-indigo-500 text-base outline-none text-gray py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e)=>{newBookInfo.price = e.target.value;
                        setNewBookInfo({...newBookInfo})
                        }}
                    />
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label for="img" className="leading-7 text-sm font-bold">
                      Image's URL:
                    </label>
                    <input
                      id="img"
                      name="img"
                      required
                      defaultValue={newBookInfo.image}
                      className="w-full bg-gray-50 rounded border border-graylight focus:border-indigo-500 text-base outline-none text-gray py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e)=>{newBookInfo.image = e.target.value;
                        setNewBookInfo({...newBookInfo})
                        }}
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    className="flex mx-auto text-white bg-pink-600 border-0 py-2 px-8 focus:outline-none  hover:bg-orang2 rounded text-lg font-bold"
                    type="submit">
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
          </form>
        </section>
      </div>
     );
}

export default AddBooktoAuthor;