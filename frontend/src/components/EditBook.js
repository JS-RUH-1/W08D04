import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditBook() {
  const params = useParams();
  const [Book, setBook] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      console.log("there is token");
    } else navigate("/login");
  }, []);

  async function fetchData() {
    const res = await axios.get(`http://localhost:8080/books/${params.id}`);
    const data = await res.data;
    setBook(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  function submitEdit() {
    axios
      .put(`http://localhost:8080/books/update/${params.id}`, Book)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <section className=" text-darkblue body-font relative">
        <div className="max-w-xl mb-6 md:mx-auto sm:text-center lg:max-w-2xl md:mb-">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-purple1 uppercase rounded-full bg-pink-200">
              Edit
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
              <span className="relative">Edit the Book</span>
            </span>
          </h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitEdit();
          }}
          className="form__white__label"
          style={{ textAlign: "center" }}
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
                      className="w-full bg-gray-50 rounded border border-graylight focus:border-indigo-500 text-base outline-none text-gray py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      type="text"
                      defaultValue={Book.title}
                      onChange={(e) => {
                        Book.title = e.target.value;
                        setBook({ ...Book });
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
                      className="w-full bg-gray-50 rounded border border-graylight focus:border-indigo-500 text-base outline-none text-gray py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      id="img"
                      defaultValue={Book.image}
                      onChange={(e) => {
                        Book.image = e.target.value;
                        setBook({ ...Book });
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
                    className="w-full bg-gray-50 rounded border border-graylight focus:border-indigo-500 text-base outline-none text-gray py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"

                      type="text"
                      defaultValue={Book.pages}
                      onChange={(e) => {
                        Book.pages = e.target.value;
                        setBook({ ...Book });
                      }}
                    />{" "}
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label for="price" className="leading-7 text-sm font-bold">
                      Price:
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 rounded border border-graylight focus:border-indigo-500 text-base outline-none text-gray py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      defaultValue={Book.price}
                      onChange={(e) => {
                        Book.price = e.target.value;
                        setBook({ ...Book });
                      }}
                    />
                  </div>
                </div>

                <div className="p-2 w-full">
                  <button
                    className="flex mx-auto text-white bg-pink-600 border-0 py-2 px-8 focus:outline-none  hover:bg-orang2 rounded text-lg font-bold"
                    type="submit"
                  >
                    
                    Submit
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

export default EditBook;
