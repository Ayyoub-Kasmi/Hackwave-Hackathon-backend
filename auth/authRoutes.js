const { Router } = require('express');

const authController = require('./authControllers');

const router = Router();

// router.get('/register', authController.createStudent);
// router.get('/login', authController.);

router.post('/register',authController.createStudent);
router.post('/login', authController.get_login);
router.post('/logout', authController.userAuth);

// router.post('/check-email', authController.check_email); //controller for checking if an email exists (for forgotten password page)

// router.post('/reset-password/request/:userId', authController.request_reset_password);
// router.post('/reset-password/:token', authController.reset_password);
// router.get('/confirmation/:emailToken', authController.confirm_email);
// router.post('/logout', authController.post_logout);

module.exports = router;