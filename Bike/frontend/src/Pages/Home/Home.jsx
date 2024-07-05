import React from 'react';
import Navbar from '../../Component/Navbar';
import { home } from '../../Assets'; // Assuming home is your image import
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className='flex flex-col lg:flex-row justify-center items-center  lg:space-x-10'>
        <div className=' w-full md:w-1/2'>
          <img src={home} alt="Home Image" className='object-contain'></img>
        </div>
        <div className='flex flex-col justify-center items-center  w-full md:w-1/2 gap-11'>
        <div>
        <h1 className='text-5xl text-orange-600 font-bold'>Book Now !</h1>
        </div>
          <div className='max-w-md text-center lg:text-left'>
            <p className='mb-4'>Welcome to our bike service booking page! Whether you need a routine check-up or urgent repairs, we're here to help. Simply fill out the form below to schedule your service appointment. Our experienced team will ensure your bike is in top condition for your next adventure. Ride safe with our reliable bike service!</p>
            <div className='flex justify-center items-center'>
              <Button variant="contained" sx={{ backgroundColor: "#0C97BF" }} onClick={()=>{navigate('/addbooking')}}>
                Add Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
