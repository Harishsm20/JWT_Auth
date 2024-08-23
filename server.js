const express = require('express');
const app = express();
const cors = require('cors');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = require('./middleware/authenticateToken');
const {setAuthHeader, updateToken} = require('./middleware/setAuthHeader');

app.use(express.json());
app.use(setAuthHeader);

const ids =[
    {
        email : "deadpool@gmail.com",
        password: "d"
    },
    {
        email: "wolverine@gmail.com",
        password: "w"
    }
]

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

app.use(cors({ origin: 'http://localhost:5173' })); 

app.get('/', (req, res) => {
    res.json(users);
})

app.post('/login', (req, res) => {
    // Auth
    const {email, password} = req.body;
    const user  = ids.find((u) => u.email === email);
    
    if(user){
        if(user.password === password){
            const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
            updateToken(accessToken)
            res.json({accessToken: accessToken, response: "Success"})
            console.log("login success")
        }
        else{
            res.json("Password Incorrect")
        }
    }
    else{
        res.sendStatus(404);
    }



    
})

app.get('/names',authenticateToken, (req, res) =>{
    console.log(req.user.supName);
    res.json(users.filter(user => user.name === req.user.name));
})


app.listen(3000) ? console.log(`Server started in port - ${3000}`): console.log("Server crashed");