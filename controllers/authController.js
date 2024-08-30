const express = require('express')
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

router.post('/signup', async (req, res) =>{
    const {name, email, password} = req.body;
  
    try {
        const user = await User.findOne({ email }); 

        if (!user) {
            const newUser = new User({ name, email, password });
            await newUser.save();
            console.log("Signup successfull")
            res.status(201).json({ data: "Success",message: "Signup Successful" });
        } else {
            console.log("Already exists")
            res.status(400).json({ data:"Exists" ,message: "User already exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/login', async (req, res) => {
    // Auth
    const {email, password} = req.body;
    const user  = await User.findOne({email});
    
    if(user){
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const payLoad = {
                name: user.name,
                email: user.email
            }
            const accessToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
            res.json({accessToken: accessToken, response: "Success"})
            console.log("login success")
        }
        else{
            console.log("Password Incorrect")
            res.json("Password Incorrect")
        }
    }
    else{
        res.sendStatus(404);
    }    
})

// forget password route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = jwt.sign({ email: user.email }, process.env.RESET_TOKEN_SECRET, { expiresIn: '5min' });
        const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            text: `You requested a password reset. Click the link to reset your password: ${resetURL}`,
        });

        res.json({ message: "Password reset link sent to your email" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Reset Password Route
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: "Password has been reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Invalid or expired token" });
    }
});

module.exports = router;
