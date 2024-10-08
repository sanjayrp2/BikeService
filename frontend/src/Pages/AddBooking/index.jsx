import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Autocomplete } from '@mui/material';
import Navbar from '../../Component/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

   //services: Stores the list of available services fetched from the server.
   //loading: Indicates if data is being loaded.
   //error: Stores any error messages.
  //formData: Stores the form input values.
const AddBookingForm = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
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
        const currentDate = new Date().toISOString().split('T')[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            date: currentDate
        }));
    }, []);
    //handleChange: Updates formData when any form field changes.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    //handleServiceChange: Updates the service field in formData when the user selects services from the Autocomplete component.

    const handleServiceChange = (event, newValue) => {
        setFormData({ ...formData, service: newValue.map(service => service.sname) });
    };
    //validateForm: Checks if all required fields are filled, validates email and phone formats, and shows error notifications if any validation fails.
    const validateForm = () => {
        const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name || !formData.email || !formData.phone || !formData.vname || !formData.vno || !formData.vmodel || !formData.address || formData.service.length === 0) {
            toast.error('All fields are required.');
            return false;
        }
        if (!emailRegex.test(formData.email)) {
            toast.error('Invalid email format.');
            return false;
        }
        if (formData.phone.length<10){
            toast.error('Invalid phone number.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('https://bikehubserver.onrender.com/bookings/addbooking', formData);
            if (response.data.status === 'ok') {
                navigate('/', { state: { message: 'Booking completed!' } });
            } else {
                toast.error(response.data.message || 'Failed to add booking.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while adding the booking. Please try again.');
        }
    };
    //useEffect: Fetches the list of services from the server when the component mounts and updates the services state.
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('https://bikehubserver.onrender.com/services/allservices');
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
            <ToastContainer />
            <div className='flex justify-center items-center font-bold text-2xl text-orange-600 my-5 '>
                Book your Vehicle
            </div>
            <div className='flex flex-col justify-center items-center w-full px-4 md:px-0'>
                <form className='shadow-lg p-6 bg-white rounded-lg max-w-[30%]' onSubmit={handleSubmit}>
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
                        value={services.filter(service => formData.service.includes(service.sname))}
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
