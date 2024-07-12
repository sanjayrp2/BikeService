const mongoose = require("mongoose");

const AdminDetailsScehma = new mongoose.Schema({
        email: String,
        phone: String,
        pass: String,
        role: String,
    },
    { collection: "AdminInfo", } );

const Admin =mongoose.model("AdminInfo", AdminDetailsScehma);
module.exports = Admin; 

// sample input
// [{
//     "_id": {
//       "$oid": "66862406d42613dce8eff5dc"
//     },
//     "email": "sanjayramesh.official@gmail.com",
//     "phone": {
//       "$numberLong": "8525835228"
//     },
//     "noofbook": 0,
//     "pass": "$2b$13$kpX59Jindk4K1vqMCtKji.8bl5sZh9zFT3ykSj4s.Q1XZWMSR8J.m",
//     "role": "admin",
//     "__v": 0
//   }]