const express = require("express");
const router = express.Router();

const devicesController = require("../controllers/devicesController");
const testsController = require("../controllers/testsController");

// CRUD
router.get("/", devicesController.getAll);
router.post("/", devicesController.create);
router.put("/:id", devicesController.update);
router.delete("/:id", devicesController.remove);

// TESTE DE PING
router.post("/:id/test", testsController.testDevice);
router.get("/:id/tests", testsController.getTests);

module.exports = router;
