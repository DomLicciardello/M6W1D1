import React from 'react'
import '../BlogHome/BlogHome.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import BlogCard from '../BlogCard/BlogCard';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function BlogHome() {
  const navigate = useNavigate();

  return (
    <>
    <Container fluid>
      <Row className='home-style'>
        <div className='d-flex justify-content-center'>
        <Button
        variant="dark"
        onClick={() => navigate("/newpost")}
        style={{width:"180px", marginBottom:"10px"}}>
          Nuovo articolo
        </Button>
        </div>
        <BlogCard></BlogCard>
      </Row>
    </Container>
    </>
  )
}