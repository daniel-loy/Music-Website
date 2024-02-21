import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import LikedMusic from "./components/LikedMusic";
import Home from "./components/Home"
import SignUp from "./components/SignUp";

import Login from "./components/Login";


function App() {
 

  return (
    <div className="App">
     
       <Routes>
       <Route index element={<Login />} />
        <Route path="/" element={<div></div>}/>
        <Route path="/likedMusic" element={<LikedMusic />}/>
        <Route path="/Home" element={<Home />}/>
        <Route path="/SignUp" element={<SignUp />}/>
        </Routes>
    </div>
  );
}
export default App;
