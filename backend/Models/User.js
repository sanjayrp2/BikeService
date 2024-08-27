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

    
   // sample input
    // {
    //     "_id": {
    //       "$oid": "668786090ca65581e9e7f130"
    //     },
    //     "email": "lingashkumaar777@gmail.com",
    //     "phone": "7904394582",
    //     "pass": "$2b$13$wIliUzM006MF59pYhGS29OP9l.nsRGv5fY5aQtCZ1s5gzbc9OYT6e",
    //     "role": "user",
    //     "__v": 0
    //   },
