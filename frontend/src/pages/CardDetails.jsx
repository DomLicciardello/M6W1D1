import React from 'react'
import BlogNavBar from "../components/BlogNavBar/BlogNavBar";
import BlogFooter from "../components/BlogFooter/BlogFooter";
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./pagesStyle/CardDetails.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function CardDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:3001/blogs/${id}/comments`)
    .then((response) => response.json())
    .then((comments) => {
      setComments(comments);
    })
  }, []);

  useEffect(() => {
      fetch(`http://localhost:3001/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => {
          setData(data);
          //console.log(data);
      })
      .catch(error => console.log(error))
    },[]);

    const handleSubmit=(e)=> {
      e.preventDefault();
      fetch(`http://localhost:3001/blogs/${id}/comments`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            content: comment,
          })
      })
      .then(()=>{
          alert('Grazie per il tuo commento!');
          window.location.reload();
      })
      .catch((err)=>{
        alert('Invio commento non riuscito! ' + err);
    })
  };

  return (
    <>
    <BlogNavBar></BlogNavBar>
    <div style={{backgroundColor:"#F4C21B", padding:"30px"}}>
        <Card>
        <Card.Img className='detail-cover-style' variant="top" src={data.cover}/>
        <Card.Body>
          <Card.Text>
            <div>
              <h2 id='detail-title'>{data.title}</h2>
              <p>{data.content}</p>
            </div>
            <div>
              <Form onSubmit={handleSubmit}>
               <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Lascia un commento:</Form.Label>
               <Form.Control type="text" placeholder="Scrivi qui..." onChange={(e) => setComment(e.target.value)}/>
               </Form.Group>
               <Button variant="dark" type="submit">
               Invia
               </Button>
              </Form>
              <hr></hr>
              {comments.map((com) => (
                <div key={com._id}>
                  <div>
                    <span style={{fontWeight:"bold"}}>{com.author.name}: </span>
                    <span>{com.content}</span>
                  </div>
                  <div>
                    <span style={{fontSize:"10px"}}>{com.createdAt}</span>
                  </div>
                <hr></hr>
                </div>
              ))}

            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    <BlogFooter></BlogFooter>
   </>
  )
}