const express = require('express');
const router =express.Router();
const {BookingDetails ,AddBooking,FetchAllBooking,UpdateBooking, CompletedBooking, PendingBooking, ParticularDate} = require('../Controllers/Add_Booking_Controller');
const { model } = require('mongoose');

router.post('/addbooking',AddBooking);
router.post('/history',CompletedBooking);
router.post('/allbookings', FetchAllBooking);
router.put('/updatestatus', UpdateBooking);
router.get('/details', BookingDetails );
router.get('/pending',PendingBooking);
router.get('/givendate',ParticularDate);
module.exports=router;


