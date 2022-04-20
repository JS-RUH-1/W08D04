import React from "react";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <>
      <div className="continer__NavBar">
        <Link className="Link_Nav" to="/">
          Home
        </Link>
        <Link className="Link_Nav" to="/AuthorsPage">
          Authors
        </Link>
        <Link className="Link_Nav" to="/BooksPage">
          Books
        </Link>
      </div>
      
      <hr />
    </>
  );
}

export default NavBar;
