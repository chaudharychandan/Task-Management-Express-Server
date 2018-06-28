const express = require('express');
const router = express.Router();

const { AuthController } = require('../controllers');

router.get('/google', AuthController.google.saveRequester, AuthController.google.authenticate());

router.get('/google/callback', AuthController.google.authenticateWithCode(), AuthController.google.callback);

router.get('/google/logout', AuthController.google.saveRequester, AuthController.google.logout);

module.exports = router;
