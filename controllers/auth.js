const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

// Register
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res, next) => {
    const username = req.body.username;
    try {
        const existingUser = await User.findOne({username});
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        if (existingUser) {
            return res.send('Oops, something went wrong.');
        };
        if (password !== confirmPassword) {
            return res.send('Password and Confirm Password does not match.');
        };
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        const payload = {
            username,
            password: hashedPassword
        };
        const user = await User.create(payload);
        res.send(`Thanks for signing up ${user.username}`);
    } catch (error) {
        // next(error);
        throw new Error('Something went wrong');
    };
});

// Log In
router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
});

router.post('/sign-in', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await User.findOne({username});
    if (!existingUser) {
        return res.send('Login failed. Please try again.');
    };
    const validPassword = await brcypt.compare(password, existingUser.password);
    if (!validPassword) {
        return res.send("Login failed. Please try again.");
    };
});

module.exports = router;