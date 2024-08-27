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

// {
//     "_id": {
//       "$oid": "668faeda50be8fa823b48599"
//     },
//     "date": "2024-07-11",
//     "name": "linga",
//     "email": "lingashkumaar777@gmail.com",
//     "phone": {
//       "$numberLong": "7904394582"
//     },
//     "vname": "ktm",
//     "vno": "TN-45 B-3333",
//     "vmodel": "rc 300",
//     "address": "2/145 Chennimalai, Erode",
//     "status": "Ready",
//     "service": [
//       "Brake Pads/Shoes",
//       "Engine Oil Change"
//     ],
//     "__v": 0
//   },