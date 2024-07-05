const express=require("express");
const router =express.Router();
const {UserLogin,UserRegister}=require("../Controllers/User_Controller");


router.post('/login',UserLogin);
router.post('/signup',UserRegister);
module.exports=router;