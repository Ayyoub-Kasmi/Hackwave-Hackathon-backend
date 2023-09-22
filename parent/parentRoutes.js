

const { 
    createParent,
} = require('./parentController.js');



const router = require('express').Router();


router.post('/create', createParent);


module.exports = router;