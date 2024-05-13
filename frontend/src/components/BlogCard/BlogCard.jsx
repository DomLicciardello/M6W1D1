import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import "../BlogCard/BlogCard.css"
import { Link } from 'react-router-dom';

function BlogCard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/blogs/', {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((data) => {
            setData(data);
            //console.log(data);
        })
        .catch(error => console.log(error))
      },[]);

  return (
    <>
    <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-3 mt-0">
      {data.toReversed().map((item) => (
        <Col>
          <Link to={`/post/${item._id}`} key={item._id} style={{textDecoration:"none"}}>
          <Card
          className='card-style'>
            <Card.Img
            variant="top"
            className='card-cover-style'
            src={item.cover} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
              <p style={{fontSize:"14px"}}>
                {item.category}
              </p>
              </Card.Text>
            </Card.Body>
          </Card>
          </Link>
        </Col>
      ))}
    </Row>
    </>
  );
}

export default BlogCard;