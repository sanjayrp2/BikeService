import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userRoutes from './Route/userRoutes';
import adminRoutes from './Route/adminRoutes';
import ProtectedRoute from './ProtectedRoute';
import Login from './Pages/Login';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound';


function App() {
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path='/' element={<Home/>}/>
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
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
