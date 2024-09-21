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
    try {
        await user.save();
        res.send("user added successfully....");
    } catch (err) {
        res.status(400).send("Error saving data to Db" + err.message);
    }
})

//Feed API - get all the users from the DB
app.get("/feed", async (req,res) =>{
    const userEmail = req.body.emailId; //getting email from body
    try{
        const userDetail = await User.find({emailId: userEmail}); //giving userdetails matching useremail also there is findOne() ==> it only return only one user matching 
        
        if(userDetail.length === 0){ //bcs userDetails would be array object if arrays len is 0 means there is no such user matching this email..
            res.status(404).send("user not found");
        }
        else{
            res.send(userDetail);
        }
    }
    catch (err){
        res.status(404).send("something went wrong");
    }
});
//delete a user from DB
app.delete("/user", async (req,res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findOneAndDelete(userId);
        res.send("user deleted successfully");
    }
    catch (err){
        res.status(404).send("something went wrong...");
    }
})

//Update the data in DB
app.patch("/user", async (req,res) => {
  const userId = req.body.userId;
  const data = req.body;
  try{
    const updatedUser = await User.findByIdAndUpdate({_id: userId}, data);
    res.send("user data updated successfully...");
  }
  catch (err){
    res.status(404).send("Data could not be updated...");
  }
});


connectDB().then(() => {
    console.log("DB connected");
    app.listen(3000,() => {
        console.log("Listening server 3000.....");
    })
}).catch((err) =>{
    console.error("DB could not connect...");
});
