import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userRoutes from './Route/userRoutes';
import adminRoutes from './Route/adminRoutes';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import {RoleContext } from './Context/RoleContext'
import SignUp from './Pages/SignUp';



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
        <Route path ="/signup" element = {<SignUp/>}/>
        {role === 'user' && userRoutes.map((route, index) => (
          <Route 
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
        {role === 'admin' && adminRoutes.map((route, index) => (
          <Route 
            key={index}
            path={route.path}
            element={
              
                route.element
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
