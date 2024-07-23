require("dotenv").config();
const express = require("express");
require('./config/database');
const methodOverride = require("method-override");
const morgan = require("morgan");
const authController = require('./controllers/auth.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');


const app = express();

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";



// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL
    })
  })
);

app.use(passUserToView);

// Routes
app.use("/auth", authController);

app.get("/", (req, res) => {
    const user = req.session.user;  
    res.render("index.ejs");
});

app.get("/vip-lounge", isSignedIn, (req, res) => {
    res.send(`Welcome to the party ${req.session.user.username}.`);
});





app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});