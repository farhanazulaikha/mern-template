const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
 
const connectToMongo = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('db is connected')
  }
  catch(err) {
    console.log(err.message)
  }
  }

module.exports = connectToMongo;