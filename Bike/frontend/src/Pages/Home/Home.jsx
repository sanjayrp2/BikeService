import React, { useEffect } from 'react';
import Navbar from '../../Component/Navbar';
import { home } from '../../Assets';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../Hooks/auth';
import { ToastContainer,toast } from 'react-toastify';

export default function Home() {
  const navigate = useNavigate();//Hook for programmatic navigation.
  const role = localStorage.getItem('role');//Retrieves the user's role from local storage.
  const location = useLocation();
  useAuth();
  //useEffect: Hook that runs when the component mounts or when location.state changes.
  useEffect(() => {
    if (location.state && location.state.message) {
        toast.success(location.state.message, { autoClose: 3000 });
    }
}, [location.state]);
  return (
    <div>
      <Navbar />
      <ToastContainer/>
      <div className='flex flex-col lg:flex-row justify-center items-center  lg:space-x-10'>
        <div className=' w-full md:w-1/2'>
          <img src={home} alt="Home Image" className='object-contain'></img>
        </div>

        {
          role === 'admin' ? (
            <><div className='flex flex-col justify-center items-center  w-full md:w-1/2 gap-11'>

              <div>
                <h1 className='text-5xl text-orange-600 font-bold'>Service now!</h1>
              </div>

              <div className='max-w-md text-center lg:text-left'>

                <p className='mb-4'>
                  The admin can now access the server page to easily add new services 🔧. Manage and update service offerings with just a few clicks!👇..</p>
                <div className='flex justify-center items-center'>
                  <Button variant="contained" sx={{ backgroundColor: "#0C97BF" }} onClick={() => { navigate('/addservices') }}>
                    Add Services
                  </Button>
                </div>
              </div></div>
            </>

          ) : (
            <>
              <div className='flex flex-col justify-center items-center  w-full md:w-1/2 gap-11'>

                <div>
                  <h1 className='text-5xl text-orange-600 font-bold'>Book Now !</h1>
                </div>

                <div className='max-w-md text-center lg:text-left'>
                  <p className='mb-4'>Welcome to our bike service booking page! 🏍 Whether you need a routine check-up or urgent repairs 🕰, we're here to help. Simply fill out the form below to schedule your service appointment. Our experienced team will ensure your bike is in top condition for your next adventure. Ride safe with our reliable bike service!🏍..</p>
                  <div className='flex justify-center items-center'>
                    <Button variant="contained" sx={{ backgroundColor: "#0C97BF" }} onClick={() => { navigate('/addbooking') }}>
                      Add Booking
                    </Button>
                  </div>
                </div>
              </div>
            </>

          )

        }
      </div>
    </div>
  );
}
