const router = require('express').Router();

const categoryController = require('../controllers/category.controller');


router.get('/', categoryController.getAll);
router.post('/', categoryController.add);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);



module.exports = router;