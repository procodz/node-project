const validator = require("validator");

const validateEmailId = (req) =>{
    if(!validator.isEmail(req)){
        throw new Error("invalid email");
    }
}

module.exports = {
    validateEmailId
}