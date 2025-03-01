import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import { AuthProvider } from './context/AuthContext';


// Protected Route Component
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('userId'); // Check if user is logged in
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
  <AuthProvider> 
    <Router>
      <Routes>
        {/* Public Routes  */}
         <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Home />} />
      
        {/* Protected Route for Dashboard */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
    </AuthProvider>  
  );
}

export default App;
