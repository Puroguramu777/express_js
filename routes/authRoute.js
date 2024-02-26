const express = require('express');
const router = express.Router();

router.get('/login', (rec, res)=>{
    res.render('register');
})

module.exports = router;