const express = require('express');

// importation des middlware:
const controleEmail = require('../middleware/controleEmail');
const password = require('../middleware/password');
const { signup, login } = require('../controllers/controllerUser');

// Fonction Router()
const router = express.Router();

// la route (endpoint) signup:
router.post('/signup', controleEmail, password, signup);

// la route (endpoint) login:
router.post('/login', login);

module.exports = router;
