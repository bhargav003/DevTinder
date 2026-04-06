
const mongoose = require("mongoose");
connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://bhargavfall2014_db_user:MehhXzLwXJJt2aiW@nodepractice.uaspis7.mongodb.net/DevTinder");
}

module.exports = connectDB;


