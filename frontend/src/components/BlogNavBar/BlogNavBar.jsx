import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/logo.png'
import "./BlogNavBar.css"
import { useNavigate } from 'react-router-dom';

function BlogNavBar() {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" id='nav-style' className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="http://localhost:3000/">
            <img
            src={logo}
            className='logo-nav'
            alt='logo'
            /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto"
          >
            <Nav.Link href="http://localhost:3000/cinema" className="nav-link-style">
                <ion-icon name="film-outline"></ion-icon>
                <p>CINEMA</p>
            </Nav.Link>
            <Nav.Link href="http://localhost:3000/fumetti" className="nav-link-style">
                <ion-icon name="book-outline"></ion-icon>
                <p>FUMETTI</p>
            </Nav.Link>
            <Nav.Link href="http://localhost:3000/videogiochi" className="nav-link-style">
                <ion-icon name="game-controller-outline"></ion-icon>
                <p>VIDEOGIOCHI</p>
            </Nav.Link>
          </Nav>
          <hr/>
          <Nav>
            <Button
            onClick={() => navigate("/login")}
            className="nav-button-style"
            variant="outline-dark">
              Accedi
            </Button>
            <Button
            onClick={() => navigate("/signin")}
            className="nav-button-style"
            variant="outline-dark">
              Registrati
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BlogNavBar;