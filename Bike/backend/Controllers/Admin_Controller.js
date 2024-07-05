
const Admin=require("../Models/Admin");
const CBooking=require("../Models/AddBooking");

// //Update Number of Book per day
// module.exports.UpdateNumofBooks= async (req, res) => {
//     var { noofbook } = req.body;
//     try {
//         const data = await Admin.updateOne({}, { $set: { noofbook: noofbook } });
//         res.send({ status: "ok"});
//     } catch (error) {
//         console.log(error);
//     }
// };


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
// Find all SeeallBooking booking 
module.exports.SeeallBooking= async (req, res) => {
    // const {  } = req.body;
    try {
        const data = await CBooking.find();
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
};
//Fetch All Completed & pending Booking
module.exports.AllStatusofBooking= async (req, res) => {
    const {status}=req.body;
    try {
        const data = await CBooking.find({ status: status });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
};


