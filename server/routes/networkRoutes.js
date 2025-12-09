// server/routes/networkRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/networkScanController");

// GET /network/scan
router.get("/scan", controller.scanNetwork);

module.exports = router;
