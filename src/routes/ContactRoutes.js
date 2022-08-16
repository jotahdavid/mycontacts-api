const { Router } = require('express');

const ContactController = require('../app/controllers/ContactController');

const router = Router();

router.get('/', ContactController.index);
router.get('/:id', ContactController.show);
router.post('/', ContactController.store);
router.delete('/:id', ContactController.delete);
router.put('/:id', ContactController.update);

module.exports = router;
