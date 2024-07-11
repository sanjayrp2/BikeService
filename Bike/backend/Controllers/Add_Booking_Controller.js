const CBooking = require("../Models/AddBooking");
const User = require("../Models/User");
const nodemailer = require('nodemailer');

// Nodemailer configuration
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'bikehub222@gmail.com',
        pass: 'qqfb gelx nzuc kgwz'
    }
});

module.exports.AddBooking = async (req, res) => {
    const { date, name, email, phone, vname, vno, vmodel, address, service } = req.body;
    const status = "Pending";

    try {
       
        const activeBooking = await CBooking.findOne({ vno: vno, status: { $in: ["Pending", "Ready"] } });
        if (activeBooking) {
            return res.send({ status: "NotCompleted" });
        }
        const emailBooking = await User.findOne({  email: email  });
        if (!emailBooking) {
            return res.send({ status: "Email not exist" });
        }

        const newBooking = await CBooking.create({ date, name, email, phone, vname, vno, vmodel, address, status, service });
        let mailOptionsOwner = {
            from: 'bikehub222@gmail.com',
            to: 'bikehub222@gmail.com',
            subject: 'New Booking',
            text: `A new service booking has been made by Email: ${email} \nPhone:${phone}\n Name: ${name} \n for vehicle ${vname} (${vno}) on ${date}.`
        };
        let mailoptionsforCustomer = {
            from: 'bikehub222@gmail.com',
            to: email,
            subject: 'New Booking',
            text: `Succesfully Booked! \nVehicleNumber:${vno} \nEmail:${email} \nPhone:${phone}\n Name:${name} for vehicle ${vname} on ${date}.`
        }
        transporter.sendMail(mailOptionsOwner, (error, info) => {
            if (error) {
                return console.log(`Error sending email to owner: ${error}`);
            }
            console.log('Email sent to owner: %s', info.messageId);
        });
        transporter.sendMail(mailoptionsforCustomer, (error, info) => {
            if (error) {
                return console.log(`Error sending email to owner: ${error}`);
            }
            console.log('Email sent to owner: %s', info.messageId);
        });

        res.send({ status: "ok" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};

module.exports.CompletedBooking = async (req, res) => {
    const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email, status: "Completed" });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};

module.exports.PendingBooking = async (req, res) => {
    const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email, status: { $nin: ["Completed"] } });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};

module.exports.FetchAllBooking = async (req, res) => {
    const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};
module.exports.SearchVnum = async (req, res) => {
    const { vno } = req.body;
    console.log(req.body);
    try {
        const data = await CBooking.find({ vno: vno });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};

module.exports.BookingDetails = async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await CBooking.findOne({ _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};

module.exports.UpdateBooking = async (req, res) => {
    const { _id, status, email,vno } = req.body;
    try {
        var data = await CBooking.updateOne({ _id: _id }, { $set: { status: status } });

        
        if (status === "Ready") {
            let mailOptionsUser = {
                from: 'bikehub222@gmail.com',
                to: email,
                subject: 'Booking Update',
                text: `Service for your vehicle(${vno}) is Ready🎉. Please pick up your vehicle!🏍️💨`
            };
            transporter.sendMail(mailOptionsUser, (error, info) => {
                if (error) {
                    return console.log(`Error sending email to user: ${error}`);
                }
                console.log('Email sent to user: %s', info.messageId);
            });
        }
        if (status === "Completed") {
            let mailOptionsUser = {
                from: 'bikehub222@gmail.com',
                to: email,
                subject: 'Booking Update',
                text: `Service for your vehicle (${vno}) is completed🎉.\nHappy and safe ride!🏍️💨`
            };
            transporter.sendMail(mailOptionsUser, (error, info) => {
                if (error) {
                    return console.log(`Error sending email to user: ${error}`);
                }
                console.log('Email sent to user: %s', info.messageId);
            });
        }
        if (status === "Cancel") {
            let mailOptionsUser = {
                from: 'bikehub222@gmail.com',
                to: email,
                subject: 'Booking Update',
                text: `Service for your vehicle (${vno}) Booking is canceled!.`
            };
            transporter.sendMail(mailOptionsUser, (error, info) => {
                if (error) {
                    return console.log(`Error sending email to user: ${error}`);
                }
                console.log('Email sent to user: %s', info.messageId);
            });
        }
        

        res.send({ status: "ok", data: data });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};

module.exports.ParticularDate = async (req, res) => {
    const { date } = req.body;
    try {
        const data = await CBooking.find({ date: date });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};
