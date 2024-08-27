import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { BikeLogin } from '../../Assets';
import { FaUser, FaLock } from "react-icons/fa";
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../../Context/RoleContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//The Login component provides a login form for users to enter their credentials and access the application. 
export default function Login() {
  const [uname, setUname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setRole } = useContext(RoleContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://bikehubserver.onrender.com/users/login', { uname, password });
      if (response.data.status === 'ok') {
        //localStorage.setItem: Stores the token, role, and email in local storage.
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('email', response.data.email);
        setRole(response.data.role); //setRole: Updates the user role in the context.
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login. Please try again.');
    }
    setLoading(false);
  };

  const validateForm = () => {
    //Checks if the username or password is empty
    if (!uname || !password) {
      toast.error('Email and password are required.');
      return false;
    }
    return true;
  };
  // Handles form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleLogin(e);//Calls the login function if the form is valid.
    }
  };

  return (
    <div className='flex flex-col md:flex-row items-center gap-10 justify-between w-full h-screen p-4'>
      <ToastContainer />
      <div className='img w-full md:w-2/3 flex justify-center'>
        <img src={BikeLogin} alt="BikeLogin" className='w-full md:w-3/4 object-contain' />
      </div>
      <div className='form-box w-full md:w-1/3 flex flex-col items-start gap-10'>
        <form onSubmit={handleSubmit} className='w-full max-w-sm p-6 bg-white rounded-lg shadow-lg'>
          <h1 className='text-2xl font-bold mb-6'>Login</h1>
          <div className="input-box mb-4 flex items-center gap-2">
            <FaUser className='text-gray-400' />
            <TextField
              id="outlined-email"
              label="Email or Phone"
              variant="outlined"
              className='w-full'
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="input-box mb-6 flex items-center gap-2">
            <FaLock className='text-gray-400' />
            <TextField
              id="outlined-password"
              label="Password"
              variant="outlined"
              type="password"
              className='w-full'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='flex items-center justify-center'>
              <Button
                variant="contained"
                type="submit"
                sx={{ background: "#0C97BF" }} //Custom styling for the button.
                disabled={loading}//disabled: Disables the button when loading.
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
            <p>or</p>
            <div className='flex justify-center items-center'>
              <h1> Don't have an account ? <span className='text-blue-600 cursor-pointer' onClick={() => { navigate('/signup') }}>Sign up</span></h1>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
