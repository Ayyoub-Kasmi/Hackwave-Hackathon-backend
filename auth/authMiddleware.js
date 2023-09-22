const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    //get the token from the cookies
    const jwtToken = req.cookies.jwt;
    
    //check if the token is there
    if(!jwtToken) {
        res.redirect('/login');
    }
    else{

        //The token is there, check if it's valid
        jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decodedToken) => {

            if(err){
                res.redirect('/login');
            }else{
                res.locals.user = decodedToken;
                next();
            }
        })
    }
}