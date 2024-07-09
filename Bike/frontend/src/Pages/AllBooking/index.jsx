import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import Navbar from '../../Component/Navbar';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/auth';
import Table from '../../Component/Table';

export default function AllBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();
  useAuth();



  const loadRefresh = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    fetchAllBookings();
  }, [refresh]);

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/admin/seeallbooking');
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

  const fetchBookingsByVnum = async (vno) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/bookings/searchvnum', { vno });
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      fetchBookingsByVnum(searchTerm);
    } else {
      fetchAllBookings();
    }
  };



  return (
    <>
      <Navbar />
      <div className="">
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-2">Bookings List</h2>
          <div className='flex justify-between items-center mb-4'>
            <form onSubmit={handleSearchSubmit} className='flex'>
              <TextField
                label="Search by Vehicle Number"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ marginRight: 2 }}
              />
              <Button variant="contained" sx={{ backgroundColor: '#0C97BF', mt: 2 }} type='submit'>
                Search
              </Button>
            </form>
            <Button variant="contained" sx={{ backgroundColor: '#0C97BF' }} onClick={loadRefresh}>Refresh</Button>
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
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Phone</th>
                    <th className="py-2 px-4 border-b">Vehicle Name</th>
                    <th className="py-2 px-4 border-b">Vehicle Number</th>
                    <th className="py-2 px-4 border-b">Vehicle Model</th>
                    <th className="py-2 px-4 border-b">Address</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Service</th>
                    <th className="py-2 px-4 border-b">Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <Table booking = {booking}/>
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
