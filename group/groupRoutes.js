const {createGroup,}=require('./groupController.js');


const router = require('express').Router();


router.post('/create', createGroup);



module.exports = router;