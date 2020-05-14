const router = require('express').Router();

const fileController = require('../controllers/file.controller');


router.get('/:collection/:image', fileController.getFile);




module.exports = router;