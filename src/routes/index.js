const { Router } = require('express');

const ContactRoutes = require('./ContactRoutes');
const CategoryRoutes = require('./CategoryRoutes');

const router = Router();

router.use('/contacts', ContactRoutes);
router.use('/categories', CategoryRoutes);

module.exports = router;
