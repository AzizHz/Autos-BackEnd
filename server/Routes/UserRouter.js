const router = require('express').Router();
const express = require('express')

const UserController = require('../Controllers/UserController');

router.post('/register', UserController.Register);
router.post('/login', UserController.Login);
router.post('/sendcode', UserController.ResendCode);
router.post('/verify/:ActivationNumber/:Email', express.json(), UserController.VerifyAccount);
router.get('/', UserController.find);
router.get('/:id', UserController.findOne);
router.put('/update/:id', UserController.update);
router.delete('/delete/:id', UserController.delete);

module.exports = router;
