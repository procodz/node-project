const express = require("express");
const feedRouter = express.Router();
const User = require("../models/user");

//Feed API - get all the users from the DB
feedRouter.get("/feed", async (req,res) =>{
    const userEmail = req.body.emailId; //getting email from body
    try{
        const userDetail = await User.find({emailId: userEmail}); //giving userdetails matching useremail also there is findOne() ==> it only return only one user matching 
        
        if(userDetail.length === 0){ //bcs userDetails would be array object if arrays len is 0 means there is no such user matching this email..
            res.status(404).send("user not found");
        }
        else{
            res.send(userDetail);
        }
    }
    catch (err){
        res.status(404).send("ERROR" + err.message) ;
    }
});



module.exports = feedRouter;