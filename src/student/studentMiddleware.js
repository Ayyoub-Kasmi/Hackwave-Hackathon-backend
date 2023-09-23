const jwt = require("jsonwebtoken");
const prisma = require('../prisma/prismaClient');


module.exports = (req, res, next) => {
    //get the token from the cookies
    try {
        if (!req.cookies.jwt || req.cookies.jwt.split(" ")[0] !== "Bearer") {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            })
        }
        const jwtToken = req.cookies.jwt.split(" ")[1];
        
        const decodedToken = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);

        //check if the user exists
        const user = prisma.user.findUnique({
            where: {
                id: decodedToken.id
            },
            select: {
                password: false,
            }
            
        })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })

        }


        req.user = decodedToken;
        next();


    
    } catch (error) {
        res.redirect('/login');
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })

        
    }
}