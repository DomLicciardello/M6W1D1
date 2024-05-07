import React, { useState } from 'react'
import BlogNavBar from "../components/BlogNavBar/BlogNavBar";
import BlogFooter from "../components/BlogFooter/BlogFooter";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit=(e)=> {
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
    .then((res)=>{
        if (res) { 
          alert('Accesso effettuato!');
          console.log(res.data)
          //navigate("/");
      } else {  
          alert ("Registrati per effettuare l'accesso!") 
          navigate("/signin");
      } 
    })
    .catch((err)=>{
      alert('Accesso fallito! ' + err);
  })
};

  return (
    <>
    <BlogNavBar></BlogNavBar>
    <div style={{backgroundColor:"#F4C21B", padding:"30px"}}>
        <h2 style={{margin:"0px"}}>Benvenuto su Nerd Blog:</h2>
        <hr></hr>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control name='email' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.valore)}/>
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