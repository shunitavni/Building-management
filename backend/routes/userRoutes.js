const express = require('express');
const userController = require('../controllers/userController');
const isAuth = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', isAuth, userController.logout);

module.exports = router;
