import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userRoutes from './Route/userRoutes';
import adminRoutes from './Route/adminRoutes';
import ProtectedRoute from './ProtectedRoute';
import Login from './Pages/Login';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound';
import AddBookingForm from './Pages/AddBooking';
import {RoleContext } from './Context/RoleContext'



function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);
  return (
    <RoleContext.Provider value={{ role, setRole }}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {role === 'user' && userRoutes.map((route, index) => (
          <Route 
            key={index}
            path={route.path}
            element={
              <ProtectedRoute allowedRoles={['user']}>
                {route.element}
              </ProtectedRoute>
            }
          />
        ))}
        {role === 'admin' && adminRoutes.map((route, index) => (
          <Route 
            key={index}
            path={route.path}
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                {route.element}
              </ProtectedRoute>
            }
          />
        ))}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  </RoleContext.Provider>

  );
}

export default App;
