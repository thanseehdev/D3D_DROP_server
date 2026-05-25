const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const ctrl = require('../controllers/productController');

router.get('/', ctrl.getAllProducts);
router.get('/:id', ctrl.getProductById);
router.post('/', upload.single('image'), ctrl.createProduct);
router.delete('/:id', ctrl.deleteProduct);

module.exports = router;
