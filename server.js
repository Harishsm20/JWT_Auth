const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = require('./middleware/authenticateToken');
const {setAuthHeader, updateToken} = require('./middleware/setAuthHeader');

app.use(express.json());
app.use(setAuthHeader);

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
    const user = users.find((u) => u.name === username);

    if(!user) res.sendStatus(404);
    
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    updateToken(accessToken)
    res.json({accessToken: accessToken});
});

app.get('/names',authenticateToken, (req, res) =>{
    console.log(req.user.supName);
    res.json(users.filter(user => user.name === req.user.name));
})


app.listen(3000);