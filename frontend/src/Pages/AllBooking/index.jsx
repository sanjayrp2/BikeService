import React, { useEffect, useState } from 'react'; // React and necessary hooks (useEffect, useState)
import axios from 'axios'; // Axios for HTTP requests
import { TextField, Button } from '@mui/material';
import Navbar from '../../Component/Navbar';
import useAuth from '../../Hooks/auth';
import Table from '../../Component/Table';

// State Variables
export default function AllBooking(booking) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');

  useAuth();

  const loadRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchAllBookings();
  }, [refresh]);

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://bikehubserver.onrender.com/admin/seeallbooking');
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
      const response = await axios.post('https://bikehubserver.onrender.com/bookings/searchvnum', { vno });
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

  // Search Form: Allows users to search for bookings by vehicle number.
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

  const handleStatusChange = (e) => setSelectedStatus(e.target.value)




  const filteredBookings = selectedStatus
    ? bookings.filter((booking) => booking.status === selectedStatus)
    : bookings;

  return (
    <>
      <Navbar />
      <div className="">
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-2">Bookings List</h2>
          <div className='flex justify-between items-center mb-4 '>
            <form onSubmit={handleSearchSubmit} className='flex '>
              <TextField
                label="Search by Vehicle Number"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ marginRight: 2  }}
              />
              <Button variant="contained" sx={{ backgroundColor: '#0C97BF', mt: 2  }} type='submit'>
                Search
              </Button>
              <select value={selectedStatus} onChange={handleStatusChange} className='ml-2 mt-4 font-bold text-white border-none bg-cyan-600  rounded-md h-10'>
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Ready">Ready</option>
                <option value="Completed">Completed</option>
                <option value="Cancel">Cancel</option>
              </select>
            </form>
            <Button variant="contained" sx={{ backgroundColor: '#0C97BF' }} onClick={loadRefresh}>Refresh</Button>
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
                    <th className="py-2 px-4 border-b">Update Status</th>
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
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <Table key={booking.id} booking={booking} refresh={refresh} setRefresh={setRefresh} />
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
