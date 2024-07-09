import { Autocomplete, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';

export default function Table({ booking }) {
    const [selectedStatus, setSelectedStatus] = useState([booking.status]);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleStatusChange = (event, value) => {
        setSelectedStatus(value);
    };

    const handleConfirm = async () => {
        try {
            const response = await fetch('/updatestatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: booking.id, // Assuming booking has an id field
                    status: selectedStatus,
                }),
            });

            if (response.ok) {
                // Handle success, e.g., show a notification or update the UI
                console.log('Status updated successfully');
            } else {
                // Handle error
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setOpen(false);
        }
    };

    return (
        <>
            <tr>
                <td className="py-2 px-4 border-b">{booking.date}</td>
                <td className="py-2 px-4 border-b">{booking.name}</td>
                <td className="py-2 px-4 border-b">{booking.email}</td>
                <td className="py-2 px-4 border-b">{booking.phone}</td>
                <td className="py-2 px-4 border-b">{booking.vname}</td>
                <td className="py-2 px-4 border-b">{booking.vno}</td>
                <td className="py-2 px-4 border-b">{booking.vmodel}</td>
                <td className="py-2 px-4 border-b">{booking.address}</td>
                <td className="py-2 px-4 border-b">{booking.status}</td>
                <td className="py-2 px-4 border-b">{booking.service.join(' , ')}</td>
                <td className="py-2 px-4 border-b">
                    {
                        booking.status !== 'Completed' &&
                        <Button variant="contained" sx={{ backgroundColor: '#0C97BF' }} onClick={() => setOpen(true)}>Update Status</Button>
                    }
                </td>
            </tr>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <div className='bg-white w-[30%] h-[30%] p-4' onClick={(e) => e.stopPropagation()}>
                    <form className="flex flex-col space-y-4 ">
                        <div>
                            <Autocomplete
                                id="status-dropdown"
                                options={['cancel', 'pending', 'ready', 'completed']}
                                getOptionLabel={(option) => option}
                                value={selectedStatus}
                                onChange={handleStatusChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Update Status"
                                        placeholder="Select status"
                                        margin='normal'
                                        className='md:col-span-2'
                                    />
                                )}
                                sx={{ width: '100%', '.MuiAutocomplete-listbox': { maxHeight: 300 } }}
                                ListboxProps={{ style: { maxHeight: '200px' } }}
                            />
                            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                            <Button variant='contained' onClick={handleConfirm}>Confirm</Button>
                        </div>
                    </form>
                </div>
            </Backdrop>
        </>
    );
}
