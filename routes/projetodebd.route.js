const express = require("express");
const router = express.Router();
const {getRentedStockItems} = require("../controllers/customer.controller");
const {getActive, getRevenueFromPeriod} = require("../controllers/rentcontract.controller");
const {getNeedsMaintenanceList} = require("../controllers/stockitem.controller");

router.get("/basicas/1/:id", getRentedStockItems);
router.get("/basicas/2", getActive);
router.get("/basicas/3/from/:start_date/to/:end_date", getRevenueFromPeriod);
router.get("/basicas/4", getNeedsMaintenanceList);

module.exports = router;