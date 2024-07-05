const User=require("../Models/User");
const Admin=require("../Models/Admin");
const bcrypt = require('bcrypt');

//User Login
module.exports.UserLogin = async (req, res) => {
    const { uname, password } = req.body;
    console.log(uname);
    console.log(req.body);
    try {
        let user = null;
        let role = null;

        user = await Admin.findOne({ $or: [{ email: uname }, { phone: uname }] });
        if (user) {
            role = "admin";
        } else {
            user = await User.findOne({ $or: [{ email: uname }, { phone: uname }] });
            if (user) {
                role = "user";
            }
        }

        if (!user) {
            return res.json({ error: "User Not Found" });
        }

        const valid = await bcrypt.compare(password, user.pass);
        if (valid) {
            return res.json({ status: "ok", role: role, data: user });
        } else {
            return res.json({ status: "error", error: "Invalid Password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
};

//User Register
module.exports.UserRegister = async (req, res) => {
    var { email, phone, pass } = req.body;
    const role = "user";
    console.log(req.body);

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).send({ status: "error", message: "User already exists with this email or phone number" });
        }
        pass = await bcrypt.hash(pass, 13);
        const data = new User({ email, phone, pass, role });
        await data.save();
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: "An error occurred during registration" });
    }
};