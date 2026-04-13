const express = require('express');
const {adminAuth, userAuth} = require('./middlewares/auth.js');
const connectDB = require('./config/database.js');
const app = express();
const bcrypt  = require("bcrypt") 

const User = require("./models/user.js");
const {validateSignupData, validateEmail} = require("./utils/valiations.js");

app.use(express.json());


app.post('/signup', async (req, resp)=>{
    //Creating a new Instance of User Model
  
    try{
        validateSignupData(req);
        const {firstName, lastName, emailId, password}  = req.body;
        //Encrypt the password 
        const passwordHash = await bcrypt.hash(password, 10);
        //User Instance of the user model 
        const user = new User(
            {
                firstName,
                lastName,
                emailId, 
                password : passwordHash
            }
        );
        await user.save();
        resp.send("User Successfully Added to Database");
    }catch(err){
        resp.status(400).send("Error Saving the user" + err.message);
    }
})

app.post("/login", async (req,resp)=>{
    try {
        validateEmail(emailId);
        const  {emailId, password} = req.body
        const user = await User.findOne({emailId:emailId});
       
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            res.send("Login Successful");
        }else {
            throw new Error("Password is not valid");
        }


    }catch(err) {
       resp.status(400).send("Error loggin the user" + err.message);  
    }
})

//Feed of Users
app.get('/feedAllUsers', async (req,resp)=>{
    try{
        const users = await User.find({});
        resp.send(users); 
    }catch(err){
        resp.status(400).send("Something went Wrong")
    }
})



//Delete User By Id

app.delete('/deleteUser', async (req, resp)=>{
    const userId = req.body.userId;
    try {
        const rep = await User.findByIdAndDelete(userId);
        resp.send("User Deleted Succesfully");
    }catch(err){
        resp.status(400).send("Error Deleting the user" + err.message);
    }
})

//update User by Patch
app.patch("/updateUser", async (req,resp)=>{
    
    const userId = req.body.userId;
    const body = req.body
    try{
        await User.findByIdAndUpdate({_id:userId},body )
        resp.send("User Updated Successfully");
    }catch(err){
        resp.status(400).send("Error Updating the user" + err.message);
    }
})

//Error Handling always use try catch and keep this wild card at the end as routes are matched sequentially
app.use('/', (err, req, res, next)=>{
    if(err){
        //Log to monitoring
        res.status(500).send("something went Wrong")
    }
})



connectDB().then(()=>{
    console.log("Database Connection Established Successfully")
    app.listen(3000, ()=>{
    console.log("Server is Successfully listening on 3000:...")
});
}).catch(()=>{
    console.error("Database Connection Failed with Some Error");
})
