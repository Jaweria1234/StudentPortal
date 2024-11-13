import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import  Navbar  from './Components/Navbar'
import About from './Pages/About';
import Sidebar from './Components/Dashboard/Sidebar';
import Header from './Components/Dashboard/Header';


function App() {

  return (
    <Router>
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/sidebar" element={<Sidebar/>} />
        <Route path="/header" element={<Header/>} />
      </Routes>
    </Router>
  )
}

export default App
