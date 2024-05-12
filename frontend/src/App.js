import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import LogIn from "./pages/LogIn"
import SignIn from "./pages/SignIn"
import CardDetails from "./pages/CardDetails";
import NewPost from "./pages/NewPost";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/post/:id" element={<CardDetails/>}/>
        <Route path="/newpost" element={<NewPost/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;