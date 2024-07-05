const express=require("express");
const router=express.Router();

const{UpdateServices,AddServices,AllServices,DeleteServices,FetchServices}=require("../Controllers/Add_Service_Controller");

router.post('/addservices',AddServices);
router.put('/updateservice',UpdateServices);
router.get('/allservices',AllServices);
router.get('/fetchservice',FetchServices);
router.delete('/deleteservices',DeleteServices);
module.exports=router;