import React from 'react'
import logo from "../assets/logo.png"
import BlogFooter from "../components/BlogFooter/BlogFooter";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const navigate = useNavigate();

  const handleSubmit=(e)=> {
    e.preventDefault();
    fetch("http://localhost:3001/authors/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            lastName: lastName,
            email: email,
            password: password,
        })
    })
    .then(()=>{
        alert('Registrazione avvenuta con successo!');
        navigate("/login");
    })
    .catch((err)=>{
      alert('Registrazione fallita! ' + err);
  })
};

  return (
    <>
    <div
        style={{backgroundColor:"#F8F9FA",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>
    <img style={{width:"400px"}} src={logo} alt='logo'/>
    </div>
    <div style={{backgroundColor:"#F4C21B", padding:"30px", height:"71vh"}}>
        <h2 style={{margin:"0px"}}>Entra a far parte del Nerd Blog:</h2>
        <hr></hr>
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} id="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control name='email' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} id="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
      <Form.Group as={Col} id="formGridName">
        <Form.Label>Nome</Form.Label>
        <Form.Control name='name' type='text' placeholder="Nome" onChange={(e) => setName(e.target.value)}/>
      </Form.Group>

      <Form.Group as={Col} id="formGridLastName">
        <Form.Label>Cognome</Form.Label>
        <Form.Control name='lastName' type='text' placeholder="Cognome" onChange={(e) => setLastName(e.target.value)}/>
      </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridPrivacy">
        <Form.Label>Condizioni Privacy</Form.Label>
        <Form.Check type="checkbox" label="Accetto le condizioni sulla privacy"/>
      </Form.Group>

      <Button variant="dark" type="submit">
        Registrati
      </Button>
    </Form>
    <hr></hr>
    <p>Hai già un account?</p> 
      <Button variant="dark" type="submit">
        <a href="http://localhost:3000/login" style={{textDecoration:"none", color:"white"}}>Accedi</a>
      </Button>
    </div>
    <BlogFooter></BlogFooter>
   </>
  )
}