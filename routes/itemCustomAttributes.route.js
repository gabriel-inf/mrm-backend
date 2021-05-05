const express = require("express");
const router = express.Router();

const { createType, findAllType, createBrand, findAllBrand,
        createModel, findAllModel, createPower, findAllPower } = require("../controllers/itemCustomAttributes");

// the types that are used
router.get('/types', findAllType);
router.post('/types', createType);

// the brand that are used
router.get('/brands', findAllBrand);
router.post('/brands', createBrand);

// the model that are used
router.get('/models', findAllModel);
router.post('/models', createModel);

// the power that are used
router.get('/power', findAllPower);
router.post('/power', createPower);


module.exports = router;