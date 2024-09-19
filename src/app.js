const express = require("express");
const { adminAuth } = require("./middleweres/auth")
const app = express();

// app.use("/admin",(req,res,next) =>{
//     const token = "xyz";
//     const adminAuth = token === "xyz";
//     if(!adminAuth){
//         res.send("unauthrized acccess")
//     }
//     else{
//         next();
//     }
// })
app.get("/admin/data",adminAuth,(req,res) => {
    res.send("here is all the data.....");
})
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