const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

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

    jwt.sign()
})


app.listen(3000);