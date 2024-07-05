const mongoose = require("mongoose");

const AddServiceScehma = new mongoose.Schema({
        sname: String,
        sdesc: String,
        samount: Number,
    },  { collection: "AddService", } );

const Servies = mongoose.model("AddService", AddServiceScehma);
module.exports = Servies; 