import React from 'react'
import BlogNavBar from "../components/BlogNavBar/BlogNavBar";
import BlogFooter from "../components/BlogFooter/BlogFooter";
import BlogHome from "../components/BlogHome/BlogHome";

export default function HomePage() {
  return (
    <>
     <BlogNavBar></BlogNavBar>
     <BlogHome></BlogHome>
     <BlogFooter></BlogFooter>
    </>
  )
}
