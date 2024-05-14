/* import React from 'react'
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function GoogleToken() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const accToken = searchParams.get("accToken");
        localStorage.setItem("accToken", accToken);
        navigate("/");
      });

  return (
    <div>
        <h3>Login con Google avvenuto con successo!</h3>
    </div>
  )
} */