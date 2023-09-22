//importing prisma Client
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client.js');
const bcrypt = require('bcrypt');
// const emailTransporter = require('../nodemailer').transporter;

//Global constants
const jwt_maxAge = 3 * 24 * 60 * 60; //3 days in seconds
//register controlllers
module.exports.get_register = async (req, res) => {
    res.send("This is the Calm sign in page");
}

module.exports.createStudent = async (req, res) => {
    try {

        //get data from the request body
        const {email, password , name ,major , gender , parent , group} = req.body;
        
        //checking if the email and password are given
        if(!email) throw new Error('No email provided');
        if(!password) throw new Error('No password provided');
        if (!name) throw new Error('No name provided');
        if (!major) throw new Error('No major provided');
        if (!gender) throw new Error('No gender provided');
        if (!parent) throw new Error('No parent provided');
        const parentObj = await prisma.calm_users.findUnique({
            where: {
                email: parent
            }
        })
        if (!parentObj) throw new Error('No parent provided');
        if (!group) throw new Error('No group provided');
        const groupObj = await prisma.calm_groups.findUnique({
            where: {
                 name: group
            }
        })
        if (!groupObj) throw new Error('No group provided');




    
        
        //checking the format of the email
        if(!/^[A-Za-z0-9+_.-]+@(.+)$/.test(email)){
            return res.status(422).json({
                success: false,
                message: "Invalid email format",
                error: "Invalid email format",
            })
            
        }
        
        //encrypt the password before creating the account using bcrypt
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //saving the data into the database
        const user = await prisma.calm_users.create({
            data: {
                email, password: hashedPassword,
            }
        });

        //send the confirmation email to the user asynchronously
     const token = await    jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30d"} );
            
     res.cookie('jwt', `Bearer ${token}`, {
        httpOnly: true,
        maxAge: jwt_maxAge,
        sameSite: 'none',
        secure: true,
    });
user.password = undefined;
     return res.status(201).json({

            success: true,
            message: 'Account created successfully',
            data: {

                ...user,
            },
        })

    } catch (error) {
        //send Error message
        if(error.code === "P2002") {
            return    res.status(400).json({
                success: false,
                message: "Email already exists",
                error: error.message,
            })
            }

      return  res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

//Login controllers
module.exports.get_login = async (req, res) => {
    res.send("This is the Calm login page");
}

module.exports.post_login = async (req, res) => {
    try {
        //get the email address
        const { email, password } = req.body;
        
        //checking if the email and password are given
        if(!email) throw new Error('No email provided');
        if(!password) throw new Error('No password provided');

        //search for the user in the database
        const user = await prisma.calm_users.findUnique({
            where: {
                email
            }
        })

        //checking if there's an answer from the database
        if(!user) throw new Error("Email doesn't exist");

        //user found, now checking the password
        //** Check if there's a way to declare static methods on the user schmea in prisma */
        const auth = await bcrypt.compare(password, user.password);
        if(!auth) throw new Error('Incorrect password');

        
        //user successfully authenticated, now create the jwt token
        const token = jwt.sign({username: user.username, email}, process.env.JWT_SECRET, {expiresIn: jwt_maxAge});
        res.cookie('jwt', token, { httpOnly: true, jwt_maxAge});

        //send the response
        user.password = undefined;

     return   res.status(200).json({
            success: true,
            message: 'login successful',
            data: {
                ...user,
            },
        })

    } catch (error) {
        
        if(error.code === "P1001"){
            error.message = "Internal server error. Please try again";
        }
        
        //send Error message
    return    res.status(404).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports.userAuth = async (req, res) => {
    try {
        const user = req.user ;
        return res.status(200).json({
            success: true,
            message: "User authenticated successfully",
            data: {
                ...user,
            }
        })

        
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        })
        
    }
}

module.exports.request_reset_password = async (req, res) => {
    try {

        //check if the user exists
        const user_id = Number(req.params.userId);
        const user = await prisma.calm_users.findUnique({
            where: {
                id: user_id,
            }
        })

        //throw an error if the user does not exist
        if(!user) throw new Error("User doesn't exist");

        //create the password reset link
        
        
        //create the password reset token
        jwt.sign({id: user.id}, process.env.EMAIL_SECRET, {expiresIn: '2h'}, (err, resetToken) => {
            
            if(err){
                console.log(err);
                throw new Error("Token creation failed: ");
            }

            //create the reset link
            const clientURL = process.env.CLIENT_URL;
            const resetURL = `${clientURL}/reset-password/${resetToken}`;
            res.status(500).json({
                success: false,
                message: "not implmented yet",
                data: {},
            })
            
            // //send the password reset request email
            // emailTransporter.sendMail({
            //     from: process.env.CALM_EMAIL ,
            //     to: user.email,
            //     subject: 'Password Reset Request: Calm platform',
            //     html: `Please click this link to reset your password: <a href=${resetURL}>${resetURL}</a>`
            // }, (error, info)=>{
            //     if(error){
            //         console.log(error);
            //         throw new Error("Reset email creation failed");
            //     }else{
                    
            //         //send the success response
            //         res.status(200).json({
            //             success: true,
            //             message: "Reset email has been sent successfully",
            //             data: {}
            //         })
            //     }
            // })
        });

    } catch (error) {
        //send Error message
        res.status(401).json({
            success: false,
            message: error.message,
            data: {},
        })
    }
}

module.exports.reset_password = async (req, res) => {
    try {
        
        //get the token from the params
        const resetToken = req.params.token;
        const newPassword = req.body.newPassword;

        //check if the token is there
        if(!resetToken) throw new Error('No token provided');

        //validate the token
        jwt.verify(resetToken, process.env.EMAIL_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err);
                res.status(401).json({
                    success: false,
                    message: "Invalid reset token",
                    data: {},
                })

                return;
            }

            //hash the password
            bcrypt.genSalt(function(err, salt) {
                if(err){
                    console.log(err);
                    // res.status(500).json({
                    //     success: false,
                    //     message: "Internal server error, please contact the admins",
                    //     data: {}
                    // })
                    // return;
                    throw new Error("Internal server error, please contact the admins")
                }

                bcrypt.hash(newPassword, salt, async function(err, hashedPassword) {
                    // Store hash in 
                    if(err){
                        console.log(err);
                        // res.status(500).json({
                        //     success: false,
                        //     message: "Internal server error, please contact the admins",
                        //     data: {}
                        // })
                        // return;
                        throw new Error("Internal server error, please contact the admins")
                    }

                    await prisma.calm_users.update({
                        where: {
                            id: decodedToken.id,
                        },
                        data: {
                            password: hashedPassword,
                        }
                    })

                    res.status(200).json({
                        success: true,
                        message: "Password has been reset successfully",
                        data: {} //don't send data, the user has to login again
                    })
                });
            });

        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: {},
        })
    }
}

module.exports.post_logout = (req, res) => {
    //set the cookie to '' and set a short expiry duration
    res.cookie('jwt', '', { maxAge: 1 });

    //redirect to the home page
    res.status(200).json({
        success: true,
        message: "logout successful",
        data: {},
    })
}