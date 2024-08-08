const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());

const users = [
    {
        name: "Wade Willson",
        supName: "DeadPool"
    },
    {
        name: "Logan",
        supName: "Wolverine"
    },
] 

const authenticateToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token  = authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        
        req.user = user;
        next();
    })
}

app.get('/', (req, res) => {
    res.json(users);
})

app.post('/login', (req, res) =>{
    // Authenticate
    const username = req.body.username;
    const user = {name : username};

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken: accessToken});
});

app.get('/names',authenticateToken, (req, res) =>{
    console.log(req.user.supName);
    res.json(users.filter(user => user.name === req.user.name));
})


app.listen(4000);