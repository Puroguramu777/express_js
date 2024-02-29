const express = require('express');
const router = express.Router();
const {ensureAuthenticator} = require('../middlewares/authMiddleware');
const userController = require('../controller/userController');

//TODO: Routes pour la gestion des utilisateurs
router.get('/account', ensureAuthenticator, userController.showUser);

module.exports = router;