const adminAuth = (req,res,next) => {
       
    const token = "xyz";
    const adminAuth = token === "xyz";
    if(!adminAuth){
        res.send("unauthrized acccess")
    }
    else{
        next();
    }
}

module.exports = {
    adminAuth
}