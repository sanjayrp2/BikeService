import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { ReBike } from '../../Assets';
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlesignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/users/signup', { email: email, phone: phone, pass: password });

            console.log('Login successful:', response);
            if (response.data.status === 'ok') navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid email or password');
        }
    };
    return (
        <div className='flex flex-col md:flex-row items-center gap-10 justify-between w-full h-screen p-4'>
            <div className='form-box w-full md:w-1/3 flex flex-col items-end gap-10'>
                <form onSubmit={handlesignup} className='w-full max-w-sm p-6 bg-white rounded-lg shadow-lg'>
                    <h1 className='text-2xl font-bold mb-6'>Sign Up</h1>
                    {error && <div className='text-red-500 mb-4'>{error}</div>}
                    <div className="input-box mb-4 flex items-center gap-2">
                        <FaUser className='text-gray-400' />
                        <TextField
                            id="outlined-email"
                            label="Email"
                            variant="outlined"
                            className='w-full'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-box mb-4 flex items-center gap-2">
                        <FaPhone className='text-gray-400 rotate-90' />
                        <TextField
                            id="outlined-email"
                            label="Phone"
                            variant="outlined"
                            className='w-full'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                        />
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='flex items-center justify-center'>
                            <Button variant="contained" className='' type="submit" sx={{background:"#0C97BF"}}>Sign Up</Button>
                        </div>
                        <p>or</p>
                        <div className='flex justify-center items-center'>
                            <h1> Already have an account ? <span className='text-blue-600 cursor-pointer' onClick={() => { navigate('/login') }}>Log in</span></h1>
                        </div>
                    </div>
                </form>
            </div>
            <div className='img w-full md:w-2/3 flex justify-center'>
                <img src={ReBike} alt="BikeLogin" className='w-full md:w-3/4 object-contain' />
            </div>
        </div>
    )
}
