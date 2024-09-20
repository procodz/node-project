const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");

const app = express();

app.post("/signup", async (req,res) => {
    const user = new User({
        firstname: "Raghvendra",
        lastName: "kumar",
        password: "ragh0666@",
        emailId: "techbite88@gmail.com"
    })
    user.save();
    res.send("user added successfully....");
})









connectDB()
    .then(() => {
        console.log("DB connceted....")
        app.listen(3000, () => {
            console.log("server started successfully.....")
        })
        
    })
    .catch((err) => {
        console.error("DB did not connect!!");
    });


