const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../Middleware/authenticate');
const upload = require('../Middleware/uploadMiddleware');
const { ROLES } = require('../config/global.enum');

router.post('/api/add-cart', authenticate, productController.addCart);
router.get('/api/get-cart', authenticate, productController.getCart);

router.use(authorize([ROLES.ADMIN]));
router.post('/api/order-product', authenticate, productController.orderProduct);
router.post(
	'/api/update-product',
	authenticate,
	productController.updateProductCart
);
router.post('/api/add-product', productController.createProduct);
router.post(
	'/api/upload-image',
	upload.array('images', [5]),
	productController.uploadImage
);
router.post('/api/update-product/:id', productController.updateProduct);
router.delete(
	'/api/delete-product/:id',
	authenticate,
	productController.deleteProductCart
);
router.post('/api/delete-product', productController.deleteProduct);

router.get('/api/products', authenticate, productController.getProducts);
router.get('/api/get-order', authenticate, productController.getOrder);

module.exports = router;
