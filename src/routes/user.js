const express = require("express");

const requestRouter = express.Router();

const { userAuth } = require("../middleweres/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName";

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
});

requestRouter.get("/user/connections", userAuth, async (req,res) =>{
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find(
           {$or: [
           { 
            toUserId: loggedInUser._id,
            status: "accepted",
           },
           {
            fromUserId: loggedInUser._id,
            status: "accepted",
        }
        ],
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);
        const data = await connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({message: "all the connections",
            data,
        });

        
    } catch (error) {
        res.status(404).send("ERROR : " + error.message);
    }
});

requestRouter.get("/feed", userAuth, async (req,res) => {
    try {
        
        const loggedInUser = req.user;

    } catch (error) {
        res.status.json({message: error.message});
    }
});


module.exports = requestRouter;