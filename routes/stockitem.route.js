const express = require("express");
const router = express.Router();
const {create, findAll, findOne, deleteAll, deleteOne,
       update, getEvents, getByCode, getRented, updateByCode} = require("../controllers/stockitem.controller");

// CRUD
router.get("/", findAll);
router.get("/rented", getRented);
router.get("/:id/events", getEvents);
router.get("/code/:code", getByCode);
router.put("/code/:code", updateByCode);
router.get("/:id", findOne);
router.post("/", create);
router.delete("/:id", deleteOne);
router.delete("/", deleteAll);
router.put("/:id", update);

module.exports = router;