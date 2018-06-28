const express = require('express');
const router = express.Router();
const { ProfileController } = require('../controllers');

router.get('/', ProfileController.get);

module.exports = router;
