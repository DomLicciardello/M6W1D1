import React from "react";
import { Container } from "react-bootstrap";

const Footer = (props) => {
  return (
    <footer
      style={{
        paddingTop: 50,
        paddingBottom: 50,
      }}
    >
      <Container>{`${new Date().getFullYear()} - © Strive School | Developed for homework projects.`}</Container>
    </footer>
  );
};

export default Footer;
