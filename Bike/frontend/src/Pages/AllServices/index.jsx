import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Component/Navbar';
import Card from '../../Component/Card';



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
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">Services List</h2>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div>

              {services.map((service,index) => (
                 <Card sname={service.sname} sdis={service.sdesc} samnt={service.samount}/>
                ))}
            </div>


          )}
        </div>
      </div>
     

    </>
  );
}
