const { addAdmin, post_login, deleteTeacher } = require("./adminControllers");

const router = require('express').Router();

router.post('/auth/login', post_login)

router.post('/add-admin', addAdmin);
router.post('/delete-teacher', deleteTeacher);

module.exports = router;