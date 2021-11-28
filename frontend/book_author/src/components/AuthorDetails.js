import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AuthorDetails(props) {
  const params = useParams();
  const [currAuthor, setCurrAuthor] = useState({});
  const [btn, setBtn] = useState(false);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/authors/${params.id}`)
      .then((res) => {
        setCurrAuthor(res.data);
      })
      .catch((err) => {
        console.log("error catched at fetching author", err);
      });
  }, [update]);

  let handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/authors/${params.id}`, {
        age: parseInt(e.target[0].value),
      }).then((res) => {
        setUpdate(!update);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error catched at updating author", err);
      });
  };

  return (
    <header className="App-header">
      <div>
        <h1>{currAuthor?.name}</h1>
        <img src={currAuthor?.image} />
        <h2>{currAuthor?.nationality}</h2>
        <div className="flex-rows">
          <h2>{currAuthor?.age} years old</h2>
          <button className={btn ? "hidden" : ""} onClick={() => setBtn(true)}>
            update
          </button>
          <form
            className={btn ? "flex-rows" : "flex-rows hidden"}
            onSubmit={(e) => handleSubmit(e)}
          >
            <input />
            <button onClick={() => setBtn(false)}>Submit</button>
          </form>
        </div>
        <div>
          {"Books:  " + currAuthor?.books?.map((e) => e?.title).join(" , ")}
          {/* {currAuthor?.books?.map((e, i) => {
            return (
              <div key={i} className="flex-column">
                <h3>
                  Book {i + 1}: {e?.title}
                </h3>
                <h4>{e?.pages} Pages</h4>
                <div className="flex-rows">
                  <h4>{e?.price}$</h4>
                  <button>change</button>
                  <form className="flex-rows">
                    <input />
                    <button>change</button>
                  </form>
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </header>
  );
}
export default AuthorDetails;
