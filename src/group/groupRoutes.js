const {createGroup} = require('./groupController.js');


const router = require('express').Router();


router.post('/', createGroup);


module.exports = router;