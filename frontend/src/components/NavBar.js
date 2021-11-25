import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "grey",
        height: "50px",
      }}
    >
      <Link style={{ color: "white", textDecoration: "none" }} to="/">
        {" "}
        Authors
      </Link>
      <Link style={{ color: "white", textDecoration: "none" }} to="/books">
        {" "}
        books
      </Link>
    </div>
  );
}

export default NavBar;
