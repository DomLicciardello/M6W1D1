import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cinema from "./pages/Cinema";
import NotFound from "./pages/NotFound";
import Fumetti from "./pages/Fumetti"
import Videogiochi from "./pages/Videogiochi"
import LogIn from "./pages/LogIn"
import SignIn from "./pages/SignIn"
import CardDetails from "./pages/CardDetails";
import NewPost from "./pages/NewPost";

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/cinema" element={<Cinema/>}/>
        <Route exact path="/fumetti" element={<Fumetti/>}/>
        <Route exact path="/videogiochi" element={<Videogiochi/>}/>
        <Route exact path="/login" element={<LogIn/>}/>
        <Route exact path="/signin" element={<SignIn/>}/>
        <Route exact path="/post/:id" element={<CardDetails/>}/>
        <Route exact path="/newpost" element={<NewPost/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;