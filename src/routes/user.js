const express = require("express");

const requestRouter = express.Router();

const { userAuth } = require("../middleweres/auth");
const ConnectionRequest = require("../models/connectionRequest");

//making received requests to a user

requestRouter.get("/user/request/received", userAuth, async(req,res) => {
    try {
        
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,   //making sure touserId is loggedInUser
            status: "interested", //loggedInUser can only see the request which are interested in him
        }).populate("fromUserId", "firstName lastName"); // populate method is to finding from reference DB which is User in this case 

        res.json({
            messgae: "List of received requests",
            data: connectionRequest,
        })

    } catch (error) {
        res.status(404).send("ERROR : " + error.message);
    }
})



module.exports = requestRouter;