const express = require('express');
const router = express.Router();
const { ensureUserLoggedIn } = require('../middleware/guards');


/**
 * GET /
 **/

router.get('/', function(req, res) {
    res.send({ message: 'Welcome to the GROMeal homepage! Try /users' });
});


module.exports = router;