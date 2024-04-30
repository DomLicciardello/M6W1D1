import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = props => {
  return (
    <Container fluid="sm">
      <BlogList />
    </Container>
  );
};

export default Home;