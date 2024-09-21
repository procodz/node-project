const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");

const app = express();


app.use(express.json());//converting json data to JS object
app.post("/signup", async (req,res) => {   // always mnake it async function and use await for database also put your logic in try and catch
    
    
    
    // console.log(req.body);
    const user = new User(req.body)
    try {
        await user.save();
        res.send("user added successfully....");
    } catch (err) {
        res.status(400).send("Error saving data to Db" + err.message);
    }
})




connectDB().then(() => {
    console.log("DB connected");
    app.listen(3000,() => {
        console.log("Listening server 3000.....");
    })
}).catch((err) =>{
    console.error("DB could not connect...");
});
