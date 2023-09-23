const { Router } = require('express');

const { loginStudent, logoutStudent } = require('./studentControllers');

const router = Router();

router.post('/auth/login', loginStudent);
router.post('/auth/logout', logoutStudent);

module.exports = router;