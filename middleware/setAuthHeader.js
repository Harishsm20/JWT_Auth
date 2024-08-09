let currentToken = null;

const setAuthHeader = (req,res,nexT) =>{
    if(currentToken && !req.headers['authorization']){
        req.headers['authorization'] = `Bearer ${currentToken}`
    }
}

const updateToken = (token) =>{
    currentToken = token;
}

module.exports = {
    setAuthHeader,
    updateToken
}