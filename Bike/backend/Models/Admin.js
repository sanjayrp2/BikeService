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