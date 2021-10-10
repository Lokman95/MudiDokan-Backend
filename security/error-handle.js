 function errorHandle(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        return res.status(401).json({message: "User is not Authorized"});
    }
    if(err.name === 'ValidationError'){
        return res.status(401).json({message: "User is Invalid"});
    }
    
       return res.status(500).json(err);
}

module.exports = errorHandle; 