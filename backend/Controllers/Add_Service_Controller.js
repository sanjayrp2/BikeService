
const AService =require("../Models/AddService");

//ADMIN SIDE Connectivity
//Add Service
module.exports.AddServices= async (req, res) => {
    const { sname, sdesc, samount } = req.body;
    try {
        const check = await AService.findOne({ sname });
        if (check === null) {
            await AService.create({ sname, sdesc, samount, });
            res.send({ status: "ok" });
        } else {
            res.send({ status: "error1" });
        }
    } catch (error) {   
        res.send({ send: "catch error" });
    }
};

//View All Service
module.exports.AllServices = async (req, res) => {
    try {
        const data = await AService.find();
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
};

//Fetch A Service
module.exports.FetchServices = async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await AService.findOne({ _id: _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
};

//Update A Service
module.exports.UpdateServices = async (req, res) => {
    var { _id,sname,sdesc,samount } = req.body;
    console.log(req.body);
    if (!_id ) {
        return res.status(400).send({ status: "ERROR", message: "Invalid data or missing _id" });
    }
    try {
        const updatedData = await AService.updateOne(
            { _id: _id },
            { $set: { sname: sname, sdesc: sdesc, samount: samount } }
        );
        res.send({ status: "OK", data: updatedData });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "ERROR", message: "Internal server error" });
    }
};


//Delete A Service
module.exports.DeleteServices = async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await AService.deleteOne({ _id: _id });
        if (data.deletedCount === 1) {
            res.send({ status: "OK", data: data });
        } else {
            res.send({ status: "FAILED", message: "Service not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "ERROR", message: "An error occurred while deleting the service" });
    }
};



