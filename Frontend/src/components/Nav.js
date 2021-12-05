import { Routes, Route,Link, useNavigate } from "react-router-dom";
import * as Bootstrap from 'react-bootstrap';
import Author from "./Author";
import Book from "./Book";
import Home from "./Home";
import Login from "./Login";
import Sign from './Sign'
import "../App.css"
import Details from "./Details";


export default function Nav (){

    let navigate = useNavigate();

    const logout = (e) =>{
        e.preventDefault();
        localStorage.removeItem("token");
        navigate ('/')
        alert("LogedOut")
    }

    return (
        <div>
            <Bootstrap.Nav class="navbar navbar-light bg-light">
            <Bootstrap.Container className="nav">

            <div class="container-fluid">
                <a class="navbar-brand" href="Home">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTLdDxs42vI95qpZBSlUTsgR4LAi8uCOIMkNFSyb-xryoz2Dq1dNCv6R968qEUGIitiVE&usqp=CAU" alt="" width="50" height="50" class="d-inline-block align-text-top"></img>
                <h4>Library</h4>
                </a>
             <Bootstrap.Nav className="me-auto">
             <Bootstrap.Nav.Link> <Link exact to="/">Home</Link></Bootstrap.Nav.Link>
             <Bootstrap.Nav.Link> <Link to="/Author">Authors</Link></Bootstrap.Nav.Link>
             <Bootstrap.Nav.Link> <Link to="/Book">Books</Link></Bootstrap.Nav.Link> 
             
             </Bootstrap.Nav>
             <div className="button">
             <Link to="/Login"><button>Login</button></Link>
              <Link to="/Logout"><button onClick= {(e)=> logout(e)}>Logout</button></Link> 
              </div>
             </div>


            </Bootstrap.Container>
            </Bootstrap.Nav>

            <Routes>
                <Route exact path="/" element = { <Home />}></Route>
                <Route path="/Author" element = { <Author />}></Route>
                <Route path="/Book" element = { <Book />}></Route>
                <Route path="/Details/:more" element = {<Details />}></Route>
                <Route path="/Login" element = {<Login />}></Route>
                <Route path="/Sign" element = {<Sign />}></Route>  
           </Routes>

        </div>
    )
}