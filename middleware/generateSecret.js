const crypto = require('crypto');
const bcrypt = require('bcrypt');

const saltRounds = 10;

function generateSecretKey(){
    return crypto.randomBytes(64).toString('hex');
}

const secretKey = generateSecretKey();
console.log(`Generated Secret Key: ${secretKey}`);

bcrypt.hash(secretKey, saltRounds, function(err, hash){
    if(err){
        console.error(`Error: ${err}`);
    }
    else{
        console.log(`Hashed Secret Key: ${hash}`);
    }
});