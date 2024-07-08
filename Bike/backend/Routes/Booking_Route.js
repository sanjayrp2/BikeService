const express = require('express');
const router =express.Router();
const {BookingDetails ,AddBooking,FetchAllBooking,UpdateBooking, CompletedBooking, PendingBooking, ParticularDate, SearchVnum} = require('../Controllers/Add_Booking_Controller');
const { model } = require('mongoose');

router.post('/addbooking',AddBooking);
router.post('/history',CompletedBooking);
router.post('/allbookings', FetchAllBooking);
router.put('/updatestatus', UpdateBooking);
router.get('/details', BookingDetails );
router.get('/pending',PendingBooking);
router.get('/givendate',ParticularDate);
router.post('/searchvnum',SearchVnum);
module.exports=router;


