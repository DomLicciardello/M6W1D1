import React from 'react'
import BlogFooter from '../components/BlogFooter/BlogFooter'
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import GoogleAuth from '../components/GoogleAuth/GoogleAuth';

export default function Welcome() {
    const navigate = useNavigate();

  return (
    <>
    <div
    style={{backgroundColor:"#F4C21B",
    display:"flex",
    alignContent:"center",
    justifyContent:"center",
    height:"92vh",
    padding:"50px"}}>
        <div
        style={{backgroundColor:"#F8F9FA",
        border:"solid 1px black",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        padding:"10px"}}>
        <img style={{width:"400px"}} src={logo} alt='logo'/>
            <Button
            onClick={() => navigate("/login")}
            className="nav-button-style"
            variant="outline-dark"
            style={{width:"200px"}}>
              Accedi
            </Button>
            <Button
            onClick={() => navigate("/signin")}
            className="nav-button-style"
            variant="outline-dark"
            style={{width:"200px"}}>
              Registrati
            </Button>
            <GoogleAuth/>
        </div>
    </div>
    <BlogFooter></BlogFooter>
    </>
  )
}