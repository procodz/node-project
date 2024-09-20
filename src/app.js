const express = require("express");
const connectDB = require("./config/database")
const app = express();


app.get('/', (req, res) => {
    // Simulate an error
    throw new Error('Something went wrong!');
});

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


