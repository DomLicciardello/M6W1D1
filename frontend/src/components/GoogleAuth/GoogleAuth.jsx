import React from 'react'
import Button from 'react-bootstrap/esm/Button';

export default function GoogleAuth() {
    const handleGoogleAuth = () => {
        const str = "http://localhost:3001/authors/googleLogin";
        window.open(str, "_self");
    };

  return (
    <div>
        <Button
            onClick={handleGoogleAuth}
            className="nav-button-style"
            variant="outline-dark"
            style={{width:"200px"}}>
            <ion-icon name="logo-google"></ion-icon>
            <span style={{marginLeft:"5px"}}>Accedi con Google</span>
        </Button>
    </div>
  )
}