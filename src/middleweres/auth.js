const jwt = require("jsonwebtoken");
const User  = require("../models/user")


const userAuth = async (req,res) =>{
    try{ 
        const { token } = req.cookies;
        const decodedUser = await jwt.verify(token, "secret@key123&*");
        const { _id } = decodedUser;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("user does not exist");
        }
        else{
            res.send(user);
        }
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }

}

module.exports = {
    userAuth
}