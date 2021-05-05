const express = require("express");
const router = express.Router();
const {create, findAll, findOne, deleteAll, deleteOne, update} = require("../controllers/productModel.controller");
const createType = require("../controllers/productType.controller").create;
const findAllTypes = require("../controllers/productType.controller").findAll;

// CRUD
router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", create);
router.delete("/:id", deleteOne);
router.delete("/", deleteAll);
router.put("/:id", update);

// the types that are used
router.get('/types', findAllTypes);
router.post('/types', createType);



module.exports = router;