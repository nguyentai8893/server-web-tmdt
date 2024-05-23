const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { route } = require('./productsRouter');

router.post('/api/register', userController.register);
router.post('/api/admin-register', userController.superAdmin);
router.post('/api/login', userController.login);
router.post('/api/edit-user/:id', userController.editUser);
router.get('/api/get-user-client', userController.getAllUser);

module.exports = router;
