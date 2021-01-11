const express = require('express');
const router = express.Router();

const contactControllers = require('../controllers/contact_controllers');
const verifyToken = require('../controllers/verify')

router.get('/get-contacts', verifyToken, contactControllers.getContacts);
router.post('/create-contact', verifyToken, contactControllers.createContact);

module.exports = router;  