const express = require("express");

const app = express();


app.use("/user",(req,res,next) =>{
    console.log("this is 1st handler");
    res.send("1st route");
    // next();
},
(req,res,next) => {
    console.log("this is 2nd handler...");
    res.send("2nd route");
    next();
},
(req,res,next) => {
    console.log("this is 3rd handler...");
    res.send("3rd route");

}
)

app.listen(3000, () => {
    console.log("server started successfully.....")
})