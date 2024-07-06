import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
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

    fetchBookings();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">Bookings List</h2>
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
  );
}
