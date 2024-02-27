const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController')

//Page formulaire de connexion
router.get('/login', authController.showLoginForm);
router.post('/login', authController.loginUser);

//Page formulaire de création de compte
router.get('/register', authController.showRegistrationForm);

router.post('/register', authController.registerUser)

module.exports = router;