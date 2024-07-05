import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Component/Navbar';
import Login from '../Login';
export default function AllService() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/services/allservices');
        console.log(response);
        if (response.data.status === 'OK') {
          setServices(response.data.data);
        } else {
          setError('Failed to fetch services');
        }
      } catch (error) {
        setError('An error occurred while fetching services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">Services List</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Service Name</th>
                <th className="py-2 px-4 border-b">Service Description</th>
                <th className="py-2 px-4 border-b">Service Amount</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td className="py-2 px-4 border-b">{service.sname}</td>
                  <td className="py-2 px-4 border-b">{service.sdesc}</td>
                  <td className="py-2 px-4 border-b">{service.samount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </>
  );
}
