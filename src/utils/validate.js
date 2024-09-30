const validator = require("validator");

const validateEmailId = (req) =>{
    if(!validator.isEmail(req)){
        throw new Error("invalid email");
    }
}

const validatePassword = (req) =>{
    if(!validator.isStrongPassword(req)){
        throw new Error("pls enter strong password");
    }
};

module.exports = {
    validateEmailId,
    validatePassword,
}