const mongoose = require("mongoose");
const User = require("../models/user")

const connectionRequestModel = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // index: true, this single index
        ref: "User", // linking User DB to this DB // this line is giving reference to User schema from where we can populate the query
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status: {
        type: String,
        required: true,
        enum: ["accepted", "rejected", "interested", "ignored"],
    }
});

connectionRequestModel.index({fromUserId: 1, toUserId: 1}) // it is compound indexing it is to optimize the search query in DB

const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestModel);

// connectionRequestModel.pre("save",function () { //this will check the user req if user is sending req to self i also written the logic in request.js this is just snother way you can use pre method which will work like middleware and execute before saving the data into DB
//     const connectionRequest = this;
//     if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
//         throw new Error("Bad request")
//     }
// })


module.exports = ConnectionRequest;