const validator  = require('validator'); 
const validateSignupData = (req)=>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid!");
    }
    else if(firstName.length<4 || firstName.length>50) {
        throw new Error("First Name should be between 4 and 50");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong Password")
    }
}

const validateEmail = (email) =>{
  if(!validator.isEmail){
    throw new Error("Please enter valid Email");
  }
}

module.exports = {validateSignupData, validateEmail}