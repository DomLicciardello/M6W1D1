import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/logo.png'
import "./BlogNavBar.css"

function BlogNavBar() {
  return (
    <Navbar expand="lg" id='nav-style' className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="http://localhost:3000/home">
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
            <Nav.Link href="http://localhost:3000/home" className="nav-link-style">
                <ion-icon name="film-outline"></ion-icon>
                <p>PROVA 1</p>
            </Nav.Link>
            <Nav.Link href="http://localhost:3000/home" className="nav-link-style">
                <ion-icon name="book-outline"></ion-icon>
                <p>PROVA 2</p>
            </Nav.Link>
            <Nav.Link href="http://localhost:3000/home" className="nav-link-style">
                <ion-icon name="game-controller-outline"></ion-icon>
                <p>PROVA 3</p>
            </Nav.Link>
          </Nav>
          <hr/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BlogNavBar;