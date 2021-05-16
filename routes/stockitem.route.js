const express = require("express");
const router = express.Router();
const {create, findAll, findOne, deleteAll, deleteOne,
       update, getEvents, getByCode} = require("../controllers/stockitem.controller");

// CRUD
router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", create);
router.delete("/:id", deleteOne);
router.delete("/", deleteAll);
router.put("/:id", update);
router.get("/:id/events", getEvents);
router.get("/code/:code", getByCode);

module.exports = router;