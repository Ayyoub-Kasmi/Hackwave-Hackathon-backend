const router = require('express').Router();

const subjectController = require('./subjectController');

router.post('/', subjectController.createSubject);
router.put('/:code', subjectController.updateSubject);
router.delete('/:code', subjectController.deleteSubject);

module.exports = router;