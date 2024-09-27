const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleweres/auth");

//Profile API
profileRouter.post("/profile", userAuth, async (req,res) => {
    try{
        const user = req.user;
        res.send(user);

    }
    catch(err){
        res.status(404).send("ERROR" + err.message);
    }
});

//delete a user from DB
profileRouter.delete("/user", async (req,res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findOneAndDelete(userId);
        res.send("user deleted successfully");
    }
    catch (err){
        res.status(404).send("ERROR " + err.message);
    }
});

//Update the data in DB
profileRouter.patch("/user/:userId", async (req,res) => {
    const userId = req.params?.userId;
    const data = req.body;
    
    try{
      const Allowed_Update = ["firstName", "age", "gender", "skills"];
      const isUpdateAllowed = Object.keys(data).every((k) => Allowed_Update.includes(k));
      if(!isUpdateAllowed){
          throw new Error("Invalid Update...");
      }
      if(data.skills.length > 8){
          throw new Error("skill can not be more than 8...")
      }
      const updatedUser = await User.findByIdAndUpdate({_id: userId}, data, {
          runValidators: true,
      });
      res.send("user data updated successfully...");
      
    }
    catch (err){
      res.status(404).send("ERROR " + err.message);
    }
  });

module.exports = profileRouter;