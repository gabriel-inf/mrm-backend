const express = require("express");
const router = express.Router();
const {create, findAll, findOne, deleteAll, deleteOne, update, sendToMaintenance, releaseFromMaintenance} = require("../controllers/item.controller");

// CRUD
router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", create);
router.delete("/:id", deleteOne);
router.delete("/", deleteAll);
router.put("/:id", update);

//ACTIONS
// router.post("/leave/:id", registerLeave);
// router.post("/arrive/:id", registerArrive);
router.put("/maintenance/send/:id", sendToMaintenance);
router.put("/maintenance/release/:id", releaseFromMaintenance);

module.exports = router;