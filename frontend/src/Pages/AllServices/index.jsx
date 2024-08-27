import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Component/Navbar';
import Card from '../../Component/Card';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//The AllService component in React displays a list of services, allowing administrators to add new services and showing service details using a card component
export default function AllService() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const role = localStorage.getItem('role');
  const [change, setChange] = useState(true);
  const navigate = useNavigate();
// It handles fetching data from a server, managing loading and error states, and rendering the services in a grid format.
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/services/allservices');
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
  }, [change]);

  return (
    <>
      <Navbar />
      <div>
        <div>
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">Services List</h2>
          {role === 'admin' && (
            <div className='flex items-center justify-end'>
              <Button variant="contained" sx={{ backgroundColor: '#0C97BF', mt: 2 }} onClick={() => navigate('/addservices')}>
                Add Service
              </Button>
            </div>
          )}

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  sname={service.sname}
                  sdis={service.sdesc}
                  samnt={service.samount}
                  role={role}
                  id={service._id}
                  change={change}
                  setChange={setChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
