import React from 'react'
import BlogNavBar from "../components/BlogNavBar/BlogNavBar";
import BlogFooter from "../components/BlogFooter/BlogFooter";
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./pagesStyle/CardDetails.css"

export default function CardDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
      fetch(`http://localhost:3001/blogpost/${id}`)
      .then((response) => response.json())
      .then((data) => {
          setData(data);
          //console.log(data);
      })
      .catch(error => console.log(error))
    },[]);

    // CHIAMATA API PER I COMMENTI:

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
              <h5>Commenti:</h5>
              <p>{data.comments}</p>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    <BlogFooter></BlogFooter>
   </>
  )
}
