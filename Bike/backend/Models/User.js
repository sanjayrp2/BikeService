const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema({
        email: String,
        phone: String,
        pass: String,
        role: String,
    },
    { collection: "UserInfo", } );
    const User =mongoose.model("UserInfo", UserDetailsScehma);
    module.exports = User; 


