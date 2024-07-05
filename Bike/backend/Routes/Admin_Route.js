const express = require('express');
const router =express.Router();
const { SeeallBooking, AllStatusofBooking }=require("../Controllers/Admin_Controller");
const { ParticularDate } = require('../Controllers/Add_Booking_Controller');

router.get('/finddate',ParticularDate);
router.get('/seeallbooking',SeeallBooking);
router.get('/bookingstatus',AllStatusofBooking);



module.exports=router;


