const mongoose = require("mongoose");

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://techbite88:gyzkCSypX7s4xF2Y@nodecourse.7lthm.mongodb.net/devTinder")
}

module.exports = connectDB;