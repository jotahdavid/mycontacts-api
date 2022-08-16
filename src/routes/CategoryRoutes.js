const { Router } = require('express');

const CategoryController = require('../app/controllers/CategoryController');

const router = Router();

router.get('/', CategoryController.index);
router.get('/:id', CategoryController.show);
router.post('/', CategoryController.store);
router.delete('/:id', CategoryController.delete);
router.put('/:id', CategoryController.update);

module.exports = router;
