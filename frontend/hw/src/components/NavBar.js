import '../App.css';
import { Navbar ,Container, Nav} from 'react-bootstrap';
import { Link ,useNavigate  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login'
import Signup from './Signup'



function NavBar(){

let navigate = useNavigate()
    const logout=(e)=>{
        e.preventDefault();
        localStorage.removeItem("token")
        navigate('/')

    }

    
    return(
        <div>
    <Navbar bg="light" variant="light">
    <Container>
    <Navbar.Brand href="/"> Library</Navbar.Brand>
    <Nav className="me-auto">
    <Nav.Link><Link to="/" className="link">Home</Link></Nav.Link>
    </Nav>
    <div className="naav">
    <Nav.Link><Link to ="/Login" className="link">Login</Link></Nav.Link>
    <Nav.Link><Link to="/Signup" className="link">signup</Link></Nav.Link>
    <Nav.Link><Link to="/Logout" className="link" onClick={(e)=>{logout(e)}}> Logout</Link></Nav.Link>
    </div>
    </Container>
    </Navbar>
        </div>
    )

}
export default NavBar;