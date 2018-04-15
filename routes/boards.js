const express = require('express');
const router = express.Router();
const BoardController = require('../controllers/board');

router.get('/:id', BoardController.get);
router.get('/', BoardController.index);
router.post('/', BoardController.create);
router.delete('/:id', BoardController.delete);

module.exports = router;
