const express = require('express');
const controller = require('../Controllers/ChatController');
const router = express.Router()

router.post('/', controller.createChat);
router.get('/:userId', controller.userChats);
router.get('/find/:firstId/:secondId', controller.findChat);

module.exports = router 