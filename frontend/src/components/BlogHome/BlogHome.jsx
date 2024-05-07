import React from 'react'
import '../BlogHome/BlogHome.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import BlogCard from '../BlogCard/BlogCard';

export default function BlogHome() {
  return (
    <>
    <Container fluid>
      <Row className='home-style'>
        <h2>Sito in costruzione...</h2>
        <BlogCard></BlogCard>
      </Row>
    </Container>
    </>
  )
}