const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');

const router = Router();

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.post('/contacts', ContactController.store);
router.delete('/contacts/:id', ContactController.delete);
router.put('/contacts/:id', ContactController.update);

module.exports = router;
