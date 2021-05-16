const express = require("express");
const router = express.Router();
const {create, findAll, findOne, deleteAll, deleteOne, update, getActive, getRevenue} = require("../controllers/rentcontract.controller");

router.get("/", findAll);
router.get("/active", getActive);
router.get("/revenue", getRevenue);
router.get("/:id", findOne);
router.post("/", create);
router.delete("/:id", deleteOne);
router.delete("/", deleteAll);
router.put("/:id", update);

module.exports = router;