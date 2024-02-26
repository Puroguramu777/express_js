const express = require('express');
const router = express.Router();
const {ensureAuthenticator} = require('../middlewares/authMiddleware');

router.get('/', ensureAuthenticator, (req, res)=>{
    res.render('accueil');
});

module.exports = router;