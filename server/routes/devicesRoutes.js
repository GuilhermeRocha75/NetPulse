const express = require("express");
const router = express.Router();

const devicesController = require("../controllers/devicesController");

// rotas do CRUD
router.get("/", devicesController.getDevices);
router.post("/", devicesController.createDevice);
router.put("/:id", devicesController.updateDevice);
router.delete("/:id", devicesController.deleteDevice);

// rota para testar ping
router.get("/:id/ping", devicesController.pingDevice);

module.exports = router;
