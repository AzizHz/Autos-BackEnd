const express = require('express');
const route = express.Router();
const controller = require('../Controllers/PostControllers');

//API
route.get('/', controller.find)
route.get('/:id', controller.findOne);
route.post('/add', controller.create);
route.put('/update/:id', controller.update);
route.delete('/delete/:id', controller.delete);
route.post('/:id/like', controller.likePost);

module.exports = route 