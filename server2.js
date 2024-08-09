const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authenticateToken');
require('dotenv').config();
const authenticateToken = require('./middleware/authenticateToken')

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