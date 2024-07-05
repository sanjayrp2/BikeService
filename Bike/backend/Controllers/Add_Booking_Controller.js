const CBooking =require("../Models/AddBooking");
const User = require("../Models/User");

// Send mail to service
module.exports.AddBooking = async (req, res) => {
    const { date, name, email, phone, vname, vno, vmodel, address, service } = req.body;
    const status = "Pending";

    try {
        const existingBooking = await CBooking.findOne({ date: date, vno: vno });
        if (existingBooking) {
            return res.send({ status: "exist" });
        }
        const activeBooking = await CBooking.findOne({ vno: vno, status: { $in: ["Pending", "Ready"] } });
        if (activeBooking) {
            return res.send({ status: "NotCompleted" });
        }
        const emailBooking = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
        if(!emailBooking){
            return res.send({ status: "Email not exist"});
        }
        await CBooking.create({ date, name, email, phone, vname, vno, vmodel, address, status, service });
        res.send({ status: "ok" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};


//Fetch All Completed Booking
module.exports.CompletedBooking= async (req, res) => {
    const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email, status: "Completed" });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
};

//Fetch All Booking without Status Completed
module.exports.PendingBooking= async (req, res) => {
    const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email, status: { $nin: ["Completed"] } });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
};
// Fetch All booking of a single email
module.exports.FetchAllBooking= async (req, res) => {
    const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
};

//Details of  Booking
module.exports.BookingDetails =async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await CBooking.findOne({ _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
};

module.exports.UpdateBooking= async (req, res) => {
    const { _id, status } = req.body;
    try {
        var data = await CBooking.updateOne({ _id: _id }, { $set: { status: status } });
        res.send({ status: "ok", data: data });
    } catch (error) {
        console.log(error);
    }
};
// Find all datas in a particular Date
module.exports.ParticularDate= async (req, res) => {
    const { date } = req.body;
    try {
        const data = await CBooking.find({ date: date });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
};
