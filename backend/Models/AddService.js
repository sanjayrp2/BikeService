const mongoose = require("mongoose");

const AddServiceScehma = new mongoose.Schema({
        sname: String,
        sdesc: String,
        samount: Number,
    },  { collection: "AddService", } );

const Servies = mongoose.model("AddService", AddServiceScehma);
module.exports = Servies; 

//  sample input data 
// {
//     "_id": {
//       "$oid": "668627f41908eea5119116c6"
//     },
//     "sname": "Brake Service",
//     "sdesc": "Includes: Brake pad/shoe replacement, brake fluid top-up, brake adjustment.",
//     "samount": 300,
//     "__v": 0
//   },