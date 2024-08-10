let currentToken = null;

const setAuthHeader = (req,res,next) =>{
    if(currentToken && !req.headers['authorization']){
        console.log(`Before : ${req.headers['authorization']}`)
        req.headers['authorization'] = `Bearer ${currentToken}`
        console.log(`After : ${req.headers['authorization']}`)
    }
    next();
}

const updateToken = (token) =>{
    currentToken = token;
}

module.exports = {
    setAuthHeader,
    updateToken
}