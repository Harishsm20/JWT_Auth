const express = require('express')
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


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

module.exports = router;
