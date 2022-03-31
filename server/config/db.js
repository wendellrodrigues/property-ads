const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//Switches from dev/local/production env
const connectionString = process.env.MONGO_URI || db;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1); //Exit process with failure
  }
};

module.exports = connectDB;
