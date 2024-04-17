import React from "react";
import { Container } from "react-bootstrap";

const Footer = (props) => {
  return (
    <footer
      style={{
        paddingTop: 35,
        paddingBottom: 35,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "rgba(222, 222, 222, 1) 2px -2px 4px -1px",
        marginTop: 30,
      }}
    >
      {`${new Date().getFullYear()} - © Licciardello - Epicode M6`}
    </footer>
  );
};

export default Footer;