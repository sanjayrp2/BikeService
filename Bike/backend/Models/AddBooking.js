const mongoose = require("mongoose");
const AddBookingScehma = new mongoose.Schema({
        date: String,
        name: String,
        email: String,
        phone: Number,
        vname: String,
        vno: String,
        vmodel: String,
        address: String,
        status: String,
        service: [String],
    },  { collection: "AddBooking", } );

const Booking =mongoose.model("AddBooking", AddBookingScehma);
module.exports = Booking; 