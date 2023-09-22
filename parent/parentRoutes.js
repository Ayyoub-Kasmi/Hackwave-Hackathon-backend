const { 
    createParent,
} = require('./parentController.js');

const router = require('express').Router();


router.post('/', createParent);

module.exports = router;