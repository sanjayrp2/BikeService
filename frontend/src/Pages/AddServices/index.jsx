import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import Navbar from '../../Component/Navbar';
import { useNavigate } from 'react-router-dom';

export default function AddService() {
  const [sname, setSname] = useState('');
  const [sdesc, setSdesc] = useState('');
  const [samount, setSamount] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/services/addservices', { sname, sdesc, samount });
      if (response.data.status === 'ok') {
        
        setStatus('Service added successfully');
        navigate('/allservices');
        // onServiceAdded(); // Trigger a refresh of the service list
      } else {
        setStatus('Service already exists');
      }
    } catch (error) {
      setStatus('Error adding service');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex  flex-col justify-center items-center min-h-screen bg-gray-100 ">
     <h2 className='flex justify-center items-center font-bold text-2xl text-orange-600 my-5'>Add Services</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <TextField
              type="text"
              value={sname}
              label="Service Name"
              onChange={(e) => setSname(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <TextField
              value={sdesc}
              variant="outlined"
              className='w-full'
              label="Service Description"
              onChange={(e) => setSdesc(e.target.value)}
            />
          </div>
          <div>
            
            <TextField
              type="text"
              value={samount}
              variant="outlined"
              label="Service Amount"
              onChange={(e) => setSamount(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <Button variant="contained" sx={{ backgroundColor: '#0C97BF', mt: 2 }} type='submit' className='md:col-span-2'>
                    Add Services
                </Button>
        </form>
        
      </div>
    </div>
  </>  
  );
}
