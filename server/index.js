const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 5000;
const connectToMongo = require("./database/connection");
const cookieParser = require("cookie-parser");
const sampleRoute = require("./routes/sampleRoute");

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
  }));
  app.use(express.json());

app.use(cookieParser());

// call database connection
connectToMongo().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
})

// define all routes here
app.use("/sample", sampleRoute);
