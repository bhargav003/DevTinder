const express = require('express');
const {adminAuth, userAuth} = require('./middlewares/auth.js');
const connectDB = require('./config/database.js');
const app = express();
const User = require("./models/user.js");


app.use(express.json());


//Feed of Users
app.get('/feedAllUsers', async (req,resp)=>{
    try{
        const users = await User.find({});
        resp.send(users); 
    }catch(err){
        resp.status(400).send("Something went Wrong")
    }
})

app.post('/signup', async (req, resp)=>{
    //Creating a new Instance of User Model
    const user = new User(req.body);
    try{
        await user.save();
        resp.send("User Successfully Added to Database");
    }catch(err){
        resp.status(400).send("Error Saving the user" + err.message);
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
