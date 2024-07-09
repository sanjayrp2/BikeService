import React, { useState } from 'react';
import axios from 'axios';
import { servicelogo } from '../../Assets';
import { Button, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

export default function Card({ sname, sdis, samnt, role ,id,change,setChange}) {
    const [open, setOpen] = useState(false);
    const [serviceName, setServiceName] = useState(sname);
    const [serviceDesc, setServiceDesc] = useState(sdis);
    const [serviceAmount, setServiceAmount] = useState(samnt);

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/services/updateservice', {
                _id:id,
                sname: serviceName,
                sdesc: serviceDesc,
                samount: serviceAmount
            });
            if (response.status === 200) {
                setChange(!change);
                console.log('Service updated successfully');
                setOpen(false);
            }
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg ">
                <div className='w-[200px] h-[200px]'>
                    <img src={servicelogo} alt="Service Logo" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">{sname}</h2>
                    <p className="text-center">{sdis}</p>
                    <p className="text-center text-red-500">{samnt}</p>
                </div>
                {role === 'admin' && (
                    <div className="flex justify-end w-full">
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#0C97BF', mt: 2 }}
                            onClick={() => setOpen(true)}
                        >
                            Edit
                        </Button>
                    </div>
                )}
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <div className='bg-white w-[50%] h-[50%] p-4' onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 ">
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
        </>
    );
}
