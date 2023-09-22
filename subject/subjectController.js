const prisma = require('../prisma/client.js');

module.exports.getSubject = async (req, res) => {
    const { code } = req.params;

    if(!code) return res.status(400).json({ success: false, message: "No code provided" });

    try {
        const subject = await prisma.subject.findUnique({
            where: {
                code
            }
        });

        return res.status(200).json({
            success: true,
            message: "Subject fetched successfully",
            data: {
                ...subject
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

module.exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await prisma.subject.findMany();

        return res.status(200).json({
            success: true,
            message: "Subjects fetched successfully",
            data: {
                subjects
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }

}

module.exports.createSubject = async (req, res) => {
    const { code, fullName } = req.body;

    if(!code) return res.status(400).json({ success: false, message: "No code provided" });
    if(!fullName) return res.status(400).json({ success: false, message: "No fullName provided" });

    try {
        const subject = await prisma.subject.create({
            data: {
                code, fullName
            }
        });

        return res.status(201).json({
            success: true,
            message: "Subject created successfully",
            data: {
                ...subject
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

module.exports.updateSubject = async (req, res) => {
    const { code } = req.params;
    const { fullName } = req.body;

    if(!code) return res.status(400).json({ success: false, message: "No code provided" });
    if(!fullName) return res.status(400).json({ success: false, message: "No fullName provided" });

    try {
        const subject = await prisma.subject.update({
            where: {
                code
            },
            data: {
                fullName
            }
        });

        return res.status(201).json({
            success: true,
            message: "Subject updated successfully",
            data: {
                ...subject
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

module.exports.deleteSubject = async (req, res) => {
    const { code } = req.params;

    if(!code) return res.status(400).json({ success: false, message: "No code provided" });

    try {
        const subject = await prisma.subject.delete({
            where: {
                code
            }
        });

        return res.status(201).json({
            success: true,
            message: "Subject deleted successfully",
            data: {
                ...subject
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}