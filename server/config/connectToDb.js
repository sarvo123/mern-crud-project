// Load dotenv  variables ..
// if (process.env.NODE_ENV != "production") {
//   require("dotenv").config();
// }

// import module ...
const mongoose = require("mongoose");

async function connectTodb() {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to database");
    }catch(err){
        console.log(err);
    }
}

module.exports = connectTodb;
