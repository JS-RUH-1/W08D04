import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function EditBook() {
  const params = useParams();
  const [Load, setLoad] = useState(true);
  const [Book, setBook] = useState({});
  async function fetchData() {
    const res = await axios.get(
      `http://localhost:3001/api/book/getBook/${params.id}`
    );
    const data = await res.data;
    setBook(data);

    setLoad(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (Load) return <div>LOADING ...</div>;
  function submitEdit() {
    axios
      .put(`http://localhost:3001/api/book/edit/${params.id}`, Book)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitEdit();
        }}
      >
        <label className="labels">title:</label>
        <input
          type="text"
          defaultValue={Book.title}
          onChange={(e) => {
            Book.title = e.target.value;
            setBook({ ...Book });
          }}
        ></input>
        <br />
        <label className="labels">image:</label>
        <input
          type="text"
          defaultValue={Book.image}
          onChange={(e) => {
            Book.image = e.target.value;
            setBook({ ...Book });
          }}
        ></input>
        <br />
        <label className="labels">pages:</label>
        <input
          type="text"
          defaultValue={Book.pages}
          onChange={(e) => {
            Book.pages = e.target.value;
            setBook({ ...Book });
          }}
        ></input>
        <br />
        <label className="labels">price:</label>
        <input
          type="text"
          defaultValue={Book.price}
          onChange={(e) => {
            Book.price = e.target.value;
            setBook({ ...Book });
          }}
        ></input>
        <hr />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
}

export default EditBook;
