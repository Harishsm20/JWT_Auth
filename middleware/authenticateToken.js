const crypto = require('crypto');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());

const authenticateToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token  = autheader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        
        req.user = user;
        next();
    })
}