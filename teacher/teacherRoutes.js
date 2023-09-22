const { 
    createTeacher,
} = require('./teacherController.js');

const router = require('express').Router();


router.post('/', createTeacher);

module.exports = router;