const express = require('express');

const vagaRoutes = express.Router();
const vagaController = require('../controllers/vaga.controller');

vagaRoutes.post('/', vagaController.create)
vagaRoutes.get('/', vagaController.findAll)
vagaRoutes.get('/:titulo', vagaController.findByTitle)
vagaRoutes.delete('/:titulo', vagaController.delete)
vagaRoutes.put('/:titulo', vagaController.update)

module.exports = vagaRoutes;

