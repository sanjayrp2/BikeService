import React, { useState } from 'react';
import axios from 'axios';
import { servicecard } from '../../Assets';
import { Button, TextField, Backdrop } from '@mui/material';
import { MdCurrencyRupee, MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function Card({ sname, sdis, samnt, role, id, change, setChange }) {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [serviceName, setServiceName] = useState(sname);
    const [serviceDesc, setServiceDesc] = useState(sdis);
    const [serviceAmount, setServiceAmount] = useState(samnt);

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/services/updateservice', {
                _id: id,
                sname: serviceName,
                sdesc: serviceDesc,
                samount: serviceAmount
            });
            if (response.status === 200) {
                setChange(!change);
                console.log('Service updated successfully');
                setOpenEdit(false);
            }
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/services/deleteservices', { data: { _id: id } });
            if (response.data.status === 'OK') {
                setChange(!change);
                console.log('Service deleted successfully');
                setOpenDelete(false);
            } else {
                console.error('Failed to delete service:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-5 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className='w-[200px] h-[200px]'>
                    <img src={servicecard} alt="Service Logo" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">{sname}</h2>
                    <p className="text-center">{sdis}</p>
                </div>
                <div className='bg-green-400 rounded-lg shadow-md p-2 w-28 flex justify-center items-center'>
                    <MdCurrencyRupee color='white' />
                    <p className="text-white">{samnt}</p>
                </div>
                {role === 'admin' && (
                    <div className="flex justify-between w-full">
                        <Button
                            variant="contained"
                            startIcon={<FaEdit color='white' />}
                            sx={{ backgroundColor: '#0C97BF' }}
                            onClick={() => setOpenEdit(true)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<MdDelete color='white' />}
                            sx={{ backgroundColor: '#E53E3E' }}
                            onClick={() => setOpenDelete(true)}
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openEdit}
                onClick={handleCloseEdit}
            >
                <div className='bg-white w-[50%] h-[50%] p-4' onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <div>
                            <TextField
                                type="text"
                                value={serviceName}
                                label="Service Name"
                                onChange={(e) => setServiceName(e.target.value)}
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        <div>
                            <TextField
                                value={serviceDesc}
                                variant="outlined"
                                className='w-full'
                                label="Service Description"
                                onChange={(e) => setServiceDesc(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                type="text"
                                value={serviceAmount}
                                variant="outlined"
                                label="Service Amount"
                                onChange={(e) => setServiceAmount(e.target.value)}
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#0C97BF', mt: 2 }}
                            type='submit'
                            className='md:col-span-2'
                        >
                            Update Service
                        </Button>
                    </form>
                </div>
            </Backdrop>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openDelete}
                onClick={() => setOpenDelete(!openDelete)}
            >
                <div className='bg-white flex flex-col text-black p-10 gap-5 rounded-lg'>
                    <h1>Confirm Delete</h1>
                    <p> Are you sure you want to delete this service?</p>
                    <div className='flex justify-between w-full'>
                        <Button variant="outlined" sx={{color:'#0C97BF' }} onClick={() => setOpenDelete(false)} >
                            Cancel
                        </Button>
                        <Button variant="contained" sx={{background:'#0C97BF'}} onClick={handleDelete}  autoFocus>
                            Confirm
                        </Button>
                    </div>
                </div>
            </Backdrop>
        </>
    );
}
