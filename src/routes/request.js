const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleweres/auth");

//sendConnectionReq
requestRouter.post("/sendConnectionReq", userAuth, async (req,res) => {
    try {
        const user = req.user; // we are getting the user details from the request which is describe in auth middlawere 
        res.send(user.firstName + " " + "has sent the request");
    } catch (err) {
        res.status(400).send("ERROR" + err.message);
    }
});


module.exports = requestRouter;
