import React from 'react'
import BlogNavBar from "../components/BlogNavBar/BlogNavBar";
import BlogFooter from "../components/BlogFooter/BlogFooter";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function LogIn() {
  return (
    <>
    <BlogNavBar></BlogNavBar>
    <div style={{backgroundColor:"#F4C21B", padding:"30px"}}>
        <h2 style={{margin:"0px"}}>Bentornato su Nerd Blog:</h2>
        <hr></hr>
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="dark" type="submit">
        Accedi
      </Button>
    </Form>
    </div>
    <BlogFooter></BlogFooter>
   </>
  )
}