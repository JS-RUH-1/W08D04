import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import Books from "./Books";
import "bootstrap/dist/css/bootstrap.min.css";

 
export default function NavBar(){
    return(
        <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              Yazeed Book<b>Store</b>
            </Navbar.Brand>
            <Nav className="me-auto">
              <Link to="/" style={{ color: "#fff", paddingTop: "7px" }}>
                Home
              </Link>
              <Link
                to="/Books"
                style={{ color: "#fff", paddingTop: "7px", paddingLeft: "9px" }}
              >
                Books
              </Link>
              <Link
                to="/Books"
                style={{ color: "#fff", paddingTop: "7px", paddingLeft: "378px" }}
              >
                sign in
              </Link>
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
          </Container>
        </Navbar>
      </div>
    )
}