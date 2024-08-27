import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import Navbar from '../../Component/Navbar';
import { useNavigate } from 'react-router-dom';

//The AllRecords component in React displays a list of pending vehicle service bookings for the logged-in user. It fetches data from a server,
export default function AllRecords() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  console.log(email);
  //Email: Retrieves the logged-in user's email from local storage.
  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/bookings/pending',{email:email});
      if (response.data.status === 'OK') {
        setBookings(response.data.data);
      } else {
        setError('Failed to fetch bookings');
      }
    } catch (error) {
      setError('An error occurred while fetching bookings');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Navbar />
      <div className="">
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-2">Bookings List</h2>
          <div className='flex justify-between items-center mb-4'>
            
            
            <Button variant="contained" sx={{ backgroundColor: '#0C97BF', mt: 2 }} className='md:col-span-2' onClick={() => { navigate('/addbooking') }}>
              Add Booking
            </Button>
          </div>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b min-w-[150px]">Date</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Phone</th>
                    <th className="py-2 px-4 border-b">Vehicle Name</th>
                    <th className="py-2 px-4 border-b min-w-[150px]">Vehicle Number</th>
                    <th className="py-2 px-4 border-b">Vehicle Model</th>
                    <th className="py-2 px-4 border-b min-w-[150px]">Address</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Service</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="py-2 px-4 border-b">{booking.date}</td>
                      <td className="py-2 px-4 border-b">{booking.name}</td>
                      <td className="py-2 px-4 border-b">{booking.email}</td>
                      <td className="py-2 px-4 border-b">{booking.phone}</td>
                      <td className="py-2 px-4 border-b">{booking.vname}</td>
                      <td className="py-2 px-4 border-b">{booking.vno}</td>
                      <td className="py-2 px-4 border-b">{booking.vmodel}</td>
                      <td className="py-2 px-4 border-b">{booking.address}</td>
                      <td className="py-2 px-4 border-b">{booking.status}</td>
                      <td className="py-2 px-4 border-b">{booking.service.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
