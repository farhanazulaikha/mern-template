const express = require("express");
const app = express();

const { signInUser, registerUser, verifyUser } = require("../controllers/sampleController");

app.get("/main/:id", verifyUser);

app.post("/sign-in", signInUser);

app.post("/sign-up", registerUser);

module.exports = app;