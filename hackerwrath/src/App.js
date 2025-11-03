import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../src/components/Login/login';
import Signup from "../src/components/SignUp/signup";
import Home from "../src/components/Home/home";
import Users from "../src/components/Users/users";
import Chat from "../src/components/Chat/chat";
import './App.css';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
