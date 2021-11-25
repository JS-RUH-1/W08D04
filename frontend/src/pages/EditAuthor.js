import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function EditAuthor() {
  const params = useParams();
  const [Load, setLoad] = useState(true);
  const [Author, setAuthor] = useState({});

  async function fetchData() {
    const res = await axios.get(
      `http://localhost:3001/api/author/getAuthor/${params.id}`
    );
    const data = await res.data;
    setAuthor(data);
    setLoad(false);
  }
  useEffect(() => {
    fetchData();
  }, []);
  function submitEdit() {
    axios
      .put(`http://localhost:3001/api/author/edit/${params.id}`, Author)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }
  // WAIT UNTIL THE DATA
  if (Load) return <div>LOADING ...</div>;
  return (
    <div>
      {" "}
      <form
        style={{ textAlign: "center" }}
        onSubmit={(e) => {
          e.preventDefault();
          submitEdit();
        }}
      >
        <label className="labels">Author name:</label>
        <input
          type="text"
          defaultValue={Author.name}
          onChange={(e) => {
            Author.name = e.target.value;
            setAuthor({ ...Author });
          }}
        ></input>
        <br />
        <label className="labels">Age:</label>
        <input
          type="text"
          defaultValue={Author.age}
          onChange={(e) => {
            Author.age = e.target.value;
            setAuthor({ ...Author });
          }}
        ></input>
        <br />
        <hr />
        <b className="myTitle">Books</b>
        <br />
        {Author.books.map((b, index) => {
          return (
            <div>
              <label className="labels">title:</label>
              <input
                type="text"
                defaultValue={b.title}
                onChange={(e) => {
                  Author.books[index].title = e.target.value;
                  setAuthor({ ...Author });
                }}
              ></input>
              <br />
              <label className="labels">image:</label>
              <input
                type="text"
                defaultValue={b.image}
                onChange={(e) => {
                  Author.books[index].image = e.target.value;
                  setAuthor({ ...Author });
                }}
              ></input>
              <br />
              <label className="labels">pages:</label>
              <input
                type="text"
                defaultValue={b.pages}
                onChange={(e) => {
                  Author.books[index].pages = e.target.value;
                  setAuthor({ ...Author });
                }}
              ></input>
              <br />
              <label className="labels">price:</label>
              <input
                type="text"
                defaultValue={b.price}
                onChange={(e) => {
                  Author.books[index].price = e.target.value;
                  setAuthor({ ...Author });
                }}
              ></input>
              <hr />
            </div>
          );
        })}
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
}

export default EditAuthor;
