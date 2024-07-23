const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
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
        
    } catch (error) {

    }
});

module.exports = router;