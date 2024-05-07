import React from 'react'
import logo from "../assets/logo.png"
import "./pagesStyle/NotFound.css"

export default function NotFound() {
  return (
    <div className='not-found-style'>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <h3>CLICCA SUL LOGO PER TORNARE AL SITO</h3>
    <a href="http://localhost:3000/">
        <img
        src={logo}
        className='logo-nav'
        /></a>
    </div>
  )
}
