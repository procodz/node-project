const mongoose = require("mongoose")


const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://techbite88:Databasekey@nodecourse.7lthm.mongodb.net/devTinder");
}

module.exports = connectDB;
