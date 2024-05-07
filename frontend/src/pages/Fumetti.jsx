import React from 'react'
import BlogNavBar from "../components/BlogNavBar/BlogNavBar";
import BlogFooter from "../components/BlogFooter/BlogFooter";

export default function Fumetti() {
  return (
    <>
    <BlogNavBar></BlogNavBar>
    <div style={{backgroundColor:"#F4C21B", padding:"30px", height:"70vh"}}>
        <h1 style={{margin:"0px"}}>Fumetti</h1>
    </div>
    <BlogFooter></BlogFooter>
   </>
  )
}
