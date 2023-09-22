const nodemailer = require('nodemailer');

//create a transporter for the nodemail package
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
});

module.exports.sendAccountEmail = (recipientEmail, initialPassword, userType) => {
    transporter.sendMail({
        from: process.env.CALM_EMAIL ,
        to: recipientEmail,
        subject: 'New Account Created',
        html: `Your account has been created. <br/>
        Your initial password is: ${initialPassword} <br/>
        Use it to login to the platform from <a href=${process.env.CLIENT_URL + '/auth/' + userType}>here</a>`
    }, (error, info)=>{
        if(error){
            console.log(error);
            throw new Error("Email creation failed");
        }else{
            //Send the response
            res.status(200).json({
                success: true,
                message: 'register successful, check your email for verification',
                // data: {
                //     id: user.id,
                //     email: user.email,
                //     score: user.score,
                // },
                data: {}
            });
        }
    })
}

module.exports = {
    transporter,
}