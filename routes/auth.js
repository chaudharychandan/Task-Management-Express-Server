const express = require('express');
const router = express.Router();

const { AuthController } = require('../controllers');

router.get('/google', AuthController.google.authenticate());

router.get('/google/callback', AuthController.google.authenticateWithCode(), AuthController.google.callback);

router.get('/google/logout', function() {
});

module.exports = router;
