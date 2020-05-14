
const router = require('express').Router();
const productController = require('../controllers/product.controller');
const multer = require('multer');
const upload = require('../middleware/upload.image').single('image');



router.get('/', productController.all);
router.post('/:collection', upload,  productController.add);
router.put('/:collection/:id', upload, productController.update);
router.delete('/:id', upload, productController.delete);






module.exports = router;