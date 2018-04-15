const express = require('express');
const router = express.Router();
const ListController =  require('../controllers/list');

router.get('/:id', ListController.get);
router.get('/', ListController.index);
router.post('/', ListController.create);
router.delete('/:id', ListController.delete);
router.patch('/:id', ListController.update);

module.exports = router;
