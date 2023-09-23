const prisma = require('../prisma/client.js');


module.exports.createGroup = async (req, res) => {

    try {
        const { name, size, } = req.body;
        if (!name) throw new Error('No name provided');

        const group = await prisma.public_Group.create({
            data: {
                name, size
            }
        });
        


        return res.status(201).json({
            success: true,
            message: "Group created successfully",
            data: {
                ...group
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
        
    }
}