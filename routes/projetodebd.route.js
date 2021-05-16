const express = require("express");
const router = express.Router();
const {getRentedStockItems} = require("../controllers/customer.controller");

router.get("/basicas/1/:id", getRentedStockItems);

module.exports = router;