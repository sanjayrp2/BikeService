import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Autocomplete, Box } from '@mui/material';
import Navbar from '../../Component/Navbar';

const AddBookingForm = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        date: '',
        name: '',
        email: '',
        phone: '',
        vname: '',
        vno: '',
        vmodel: '',
        address: '',
        service: []
    });

    useEffect(() => {
        // Set the current date as the default date
        const currentDate = new Date().toISOString().split('T')[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            date: currentDate
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleServiceChange = (event, newValue) => {
        setFormData({ ...formData, service: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/bookings/addbooking', formData);
            console.log('Booking status:', response.data.status);
            // Handle success or error messages based on response status
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show user-friendly message
        }
    };

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
    }, []);

    return (
        <>
        <Navbar/>
        <div className='flex justify-center items-center font-bold text-2xl text-orange-600 my-5 '>
            Book your Vehicle
        </div>
        <div className='flex flex-col justify-center items-center w-full px-4 md:px-0'>
            <form className=' shadow-lg p-6 bg-white rounded-lg max-w-[30%]' onSubmit={handleSubmit}>
                <div className='w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4'>
                <TextField
                    type='text'
                    label='Your Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin='normal'
                />
                <TextField
                    type='email'
                    label='Email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin='normal'
                />
                <TextField
                    type='tel'
                    label='Phone Number'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin='normal'
                />
                <TextField
                    type='text'
                    label='Vehicle Name'
                    name='vname'
                    value={formData.vname}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin='normal'
                />
                <TextField
                    type='text'
                    label='Vehicle Number'
                    name='vno'
                    value={formData.vno}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin='normal'
                />
                <TextField
                    type='text'
                    label='Vehicle Model'
                    name='vmodel'
                    value={formData.vmodel}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin='normal'
                />
                <TextField
                    label='Address'
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin='normal'
                    multiline
                    rows={4}
                    className='md:col-span-2'
                />
                 </div>
                <Autocomplete
                    multiple
                    id="service-dropdown"
                    options={services}
                    getOptionLabel={(option) => option.sname}
                    value={formData.service}
                    onChange={handleServiceChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Service Needed"
                            placeholder="Select services"
                            margin='normal'
                            className='md:col-span-2'
                        />
                    )}
                    sx={{ width: '100%', '.MuiAutocomplete-listbox': { maxHeight: 300 } }}
                    ListboxProps={{ style: { maxHeight: '200px' } }}
                />
                <div className='flex justify-center items-center'>
                <Button variant="contained" sx={{ backgroundColor: '#0C97BF', mt: 2 }} type='submit' className='md:col-span-2'>
                    Add Booking
                </Button>
                </div>
            </form>
        </div>
        </>
    );
};

export default AddBookingForm;
