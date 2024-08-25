const mongoose = require('mongoose')
require('dotenv').config();

const mongoURI = process.env.DB_NAME;

const connectDb = async () => {
    try{
        await mongoose.connect(mongoURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection successfull");
    }
    catch(error){
        console.log("connection failed");
        process.exit(1)
    }
}

module.exports = connectDb;