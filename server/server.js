const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

//Initilize app
const app = express();

//Connect Database
connectDB();

//Use Env Variables
require("dotenv").config();

//Initialize Middleware
app.use(express.json({ extended: false }));

//Cors
app.use(cors());

//Port is either env variable or defaults to 3000
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ response: "Response" });
});

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
