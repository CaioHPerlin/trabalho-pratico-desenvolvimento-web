const express = require('express');

const jobRoutes = express.Router();
const jobController = require('../controllers/job.controller');

jobRoutes.post('/', jobController.create)
jobRoutes.get('/', jobController.findAll)
jobRoutes.get('/:id', jobController.findById)
jobRoutes.delete('/:titulo', jobController.delete)
jobRoutes.put('/:titulo', jobController.update)

module.exports = jobRoutes;

