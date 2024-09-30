const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleweres/auth");
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

//sendConnectionReq
requestRouter.post("/sendConnectionReq", userAuth, async (req,res) => {
    try {
        const user = req.user; // we are getting the user details from the request which is describe in auth middlawere 
        res.send(user.firstName + " " + "has sent the request");
    } catch (err) {
        res.status(400).send("ERROR" + err.message);
    }
});

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) =>{
    try {const userId = req.user._id;
    const fromUserId = userId;
    const toUserId = req.params.toUserId
    
    const status = req.params.status;
    

    const allowedStatus = ["interested","ignored"];
    
    if(fromUserId == toUserId){  //if user is making request to self....
        throw new Error("Bad request...")
    }
    if(!allowedStatus.includes(status)){
        throw new Error("Bad request!");
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({  // it is checking if the req is alrady sent from both user 
        $or: [
            {fromUserId: fromUserId,toUserId: toUserId},
            {fromUserId: toUserId, toUserId: fromUserId},

        ],
    });
    const validUserId = await User.findById({_id: toUserId});// checking if the user is requesting to valid user which is present in our User DB otherwise user can send request to random id which is enot present in our User DB
    if(!validUserId){
        throw new Error('invalid user id...')
    };
    if(existingConnectionRequest){
        throw new Error("duplicate request...")
    }
    const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
    }); 

    const data = await connectionRequest.save();
    res.json({
        message: req.user.firstName + " " + "has" + " " +status + " " + toUserId.firstName,
        data,
    });




}catch(err){
    res.status(404).send("Error:" + err.message);
}
});


module.exports = requestRouter;
