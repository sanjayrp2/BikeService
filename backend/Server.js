const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
app.use(cors());

const mogoDburl = "mongodb+srv://Bikehub:HCljPSsmLJYK3NN2@bikeservice.i2gmc.mongodb.net/";

//Database Connection
mongoose.connect(mogoDburl)
.then(() => {
    console.log("Connected to database");
})
.catch((e) => console.log(e));

app.listen(5000, () => console.log('Server Started'));

const adminRoutes = require('./Routes/Admin_Route');
const bookingRoutes = require('./Routes/Booking_Route');
const serviceRoutes = require('./Routes/Service_Route');
const userRoutes = require('./Routes/User_Route');

app.use('/admin', adminRoutes);
app.use('/bookings', bookingRoutes);
app.use('/services', serviceRoutes);
app.use('/users', userRoutes);

const { authenticateToken } = require('./Middleware/jwt');

app.get('/protected-route', authenticateToken, (req, res) => {
    res.send('This is a protected route');
});