const express = require("express");
const router = express.Router();
const {getRentedStockItems} = require("../controllers/customer.controller");
const {getActive} = require("../controllers/rentcontract.controller");

router.get("/basicas/1/:id", getRentedStockItems);
router.get("/basicas/2", getActive);

module.exports = router;