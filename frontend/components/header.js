import Link from "next/link"
export default function Header({user, setUser}) {

    return <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="#"><Link href="/">CRUD</Link></a>


        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <Link href="/"><a class="nav-link" href="#">Books</a></Link>
          </li>
          <li class="nav-item">
            <Link href="/#authors"><a class="nav-link" href="#authors">Authors</a></Link>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>

        <ul class="navbar-nav me mb-2 mb-lg-0">

        {user ? <>
          <li class="nav-item"> <a className="nav-link">Welcome {user.name}</a></li>
          <li class="nav-item">
                  <a class="nav-link" href="#" onClick={() => {
                    setUser(undefined);
                    localStorage.removeItem("auth")
                    }}>Logout</a>
          </li>
        </>:<>
                  <li class="nav-item">
                  <Link href="/login"><a class="nav-link" href="#">Login</a></Link>
                </li>
                <li class="nav-item">
                  <Link href="/register"><a class="nav-link" href="#">Register</a></Link>
                </li>
                </>}
        </ul>

      </div>
    </div>
  </nav>
}