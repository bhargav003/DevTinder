const express = require('express');
const {adminAuth, userAuth} = require('./middlewares/auth.js');
const connectDB = require('./config/database.js');
const app = express();
const User = require("./models/user.js");




app.post('/signup', async (req, resp)=>{
    const userObj = {
        firstName : 'Shivani',
        lastName:'Allu',
        emailId :"bhargav.allu@gmail.com",
        password: "ShivaniAllu"
    }
    //Creating a new Instance of User Model
    const user = new User(userObj);
    try{
        await user.save();
        resp.send("User Successfully Added to Database");
    }catch(err){
        resp.status(400).send("Error Saving the user" + err.message);
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
