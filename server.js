require("dotenv").config();
const express = require("express");
require('./config/database');
const methodOverride = require("method-override");
const morgan = require("morgan");
const authController = require('./controllers/auth.js');


const app = express();

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";



// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

// Routes
app.use("/auth", authController);

app.get("/", (req, res) => {
    res.render("index.ejs");
});






app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});