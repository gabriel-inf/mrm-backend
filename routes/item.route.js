const express = require("express");
const router = express.Router();
const {create, findAll, findOne, deleteAll, deleteOne, 
    update, sendToMaintenance, releaseFromMaintenance, registerLeave, registerArrive,
    setReadyForRental} = require("../controllers/item.controller");

// CRUD
router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", create);
router.delete("/:id", deleteOne);
router.delete("/", deleteAll);
router.put("/:id", update);

//ACTIONS
router.put("/rental/leave/:id", registerLeave);
router.put("/rental/arrive/:id", registerArrive);
router.put("/maintenance/send/:id", sendToMaintenance);
router.put("/maintenance/release/:id", releaseFromMaintenance);
router.put("/setReadyForRental/:id", setReadyForRental);

module.exports = router;