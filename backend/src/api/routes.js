const express = require('express');
const { auth } = require('../middleware/auth');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const queueRoutes = require('./routes/queueRoutes');
const packageRoutes = require('./routes/packageRoutes');
const photoRoutes = require('./routes/photoRoutes');
const merchandiseRoutes = require('./routes/merchandiseRoutes');

const router = express.Router();

// Public routes
router.use('/auth', require('./routes/authRoutes'));

// Protected routes
router.use('/users', auth, userRoutes);
router.use('/events', auth, eventRoutes);
router.use('/registrations', auth, registrationRoutes);
router.use('/queue', auth, queueRoutes);
router.use('/packages', auth, packageRoutes);
router.use('/photos', auth, photoRoutes);
router.use('/merchandise', auth, merchandiseRoutes);

module.exports = router;