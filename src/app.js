const express = require("express");

const app = express();


app.use("/hello",(req,res) =>{
    res.send("namaste from server");
})

app.use("/test",(req,res) =>{
    res.send("testing....");
})

app.listen(3000, () => {
    console.log("server started successfully.....")
})