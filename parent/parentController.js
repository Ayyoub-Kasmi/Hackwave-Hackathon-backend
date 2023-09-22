const prisma = require('../prisma/client.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.createParent = async (req, res) => {
    try {

        const  {email , password , name , } = req.body;
        if (!email) throw new Error('No email provided');
        if (!password) throw new Error('No password provided');
        if (!name) throw new Error('No name provided');


        if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(email)) {
            return res.status(422).json({
                success: false,
                message: "Invalid email format",
                error: "Invalid email format",
            })

        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const parent = await prisma.calm_users.create({
            data: {
                email, password: hashedPassword, name
            }
        });

        const token = jwt.sign({ id: parent.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30d' });

        res.cookie('jwt', `Bearer ${token}`, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: true,
        });

        parent.password = undefined;

        return res.status(201).json({
            success: true,
            message: "Parent created successfully",
            data: {
                ...parent
            }
        })



        
    } catch (error) {
        
    }
}