const express = require("express");

const jobRoutes = express.Router();
const jobController = require("../controllers/job.controller");

jobRoutes.post("/", jobController.create);
jobRoutes.get("/", jobController.findAll);
jobRoutes.get("/:id", jobController.findById);
jobRoutes.delete("/:id", jobController.delete);
jobRoutes.put("/:id", jobController.update);

module.exports = jobRoutes;
