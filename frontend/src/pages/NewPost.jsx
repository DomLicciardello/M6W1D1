import React from 'react'
import BlogNavBar from '../components/BlogNavBar/BlogNavBar';
import BlogFooter from '../components/BlogFooter/BlogFooter';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
  const [category, setCategory] = useState();
  const [cover, setCover] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  const handleSubmit=(e)=> {
    e.preventDefault();
    fetch("http://localhost:3001/blogs/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            category: category,
            cover: cover,
            title: title,
            content: content,
        })
    })
    .then(()=>{
        alert('Articolo pubblicato sul blog!');
        navigate("/home");
    })
    .catch((err)=>{
      alert('Pubblicazione fallita! ' + err);
  })
};

  return (
    <>
    <BlogNavBar></BlogNavBar>
    <div style={{backgroundColor:"#F4C21B", padding:"30px"}}>
        <h2 style={{margin:"0px"}}>Pubblica un nuovo articolo:</h2>
        <hr></hr>
      <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridCategory">
          <Form.Label>Categoria</Form.Label>
          <Form.Select defaultValue="Cinema" onChange={(e) => setCategory(e.target.value)}>
            <option>Cinema</option>
            <option>Fumetti</option>
            <option>Videogiochi</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formFile">
        <Form.Label>Copertina</Form.Label>
        <Form.Control type="file" onChange={(e) => setCover(e.target.files[0])}/>
      </Form.Group>
      </Row>

      <Form.Group as={Col} controlId="formGridTitle" className="mb-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control type="text" placeholder="Titolo" onChange={(e) => setTitle(e.target.value)}/>
        </Form.Group>

      <Form.Group className="mb-3" controlId="formGridContent">
        <Form.Label>Testo</Form.Label>
        <Form.Control placeholder="Scrivi qui il contenuto dell'articolo..." onChange={(e) => setContent(e.target.value)}/>
      </Form.Group>

      <Button variant="dark" type="submit">
        Pubblica
      </Button>
    </Form>
    </div>
    <BlogFooter></BlogFooter>
   </>
  )
}