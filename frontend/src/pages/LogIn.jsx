import React, { useState } from 'react'
import BlogFooter from "../components/BlogFooter/BlogFooter";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"

export default function LogIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/authors/login/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res);
        alert("Errore nell'accesso. Controlla le tue credenziali.");
      }
    })
    .then((data) => {
      //console.log(data)
      localStorage.setItem("token", data.token);
      alert("Accesso effettuato!");
      navigate("/home");
    })
    .catch((err) => {
      alert("Si è verificato un errore! " + err);
    });
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
        <h2 style={{margin:"0px"}}>Benvenuto su Nerd Blog:</h2>
        <hr></hr>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control name='email' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant="dark" type="submit">
        Accedi
      </Button>
    </Form>
    <hr></hr>
    <p>Non hai un account?</p> 
      <Button variant="dark" type="submit">
        <a href="http://localhost:3000/signin" style={{textDecoration:"none", color:"white"}}>Registrati</a>
      </Button>
    </div>
    <BlogFooter></BlogFooter>
   </>
  )
}