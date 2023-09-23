const { Router } = require('express');

const studentController = require('./studentControllers');

const router = Router();

// router.get('/register', studentController.createStudent);
// router.get('/login', studentController.);

router.post('/register',studentController.createStudent);
router.post('/login', studentController.get_login);
router.post('/logout', studentController.userAuth);

// router.post('/check-email', studentController.check_email); //controller for checking if an email exists (for forgotten password page)

// router.post('/reset-password/request/:userId', studentController.request_reset_password);
// router.post('/reset-password/:token', studentController.reset_password);
// router.get('/confirmation/:emailToken', studentController.confirm_email);
// router.post('/logout', studentController.post_logout);

module.exports = router;