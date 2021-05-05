const db = require("../models");
const handleApiError = require("./utils/apiErrorHandler");

const typeDb = db.productType;
const powerDb = db.productType;
const brandDb = db.productType;
const modelDb = db.productType;

const BaseCrud = require("../service/BaseCrud");

// types
exports.createType = async (req, res) => {
    try {
        const created = await BaseCrud.create(typeDb, req.body);
        res.send(created);
    } catch (err) {
        handleApiError(res, err);
    }
};
exports.findAllType = async (req, res) => {
    try {
        const elements = await BaseCrud.findAll(typeDb);
        res.send(elements);
    } catch(err) {
        handleApiError(res, err);
    }
};

// power
exports.createPower = async (req, res) => {
    try {
        const created = await BaseCrud.create(powerDb, req.body);
        res.send(created);
    } catch (err) {
        handleApiError(res, err);
    }
};
exports.findAllPower = async (req, res) => {
    try {
        const elements = await BaseCrud.findAll(powerDb);
        res.send(elements);
    } catch(err) {
        handleApiError(res, err);
    }
};

// brand
exports.createBrand = async (req, res) => {
    try {
        const created = await BaseCrud.create(brandDb, req.body);
        res.send(created);
    } catch (err) {
        handleApiError(res, err);
    }
};
exports.findAllBrand = async (req, res) => {
    try {
        const elements = await BaseCrud.findAll(brandDb);
        res.send(elements);
    } catch(err) {
        handleApiError(res, err);
    }
};

// model
exports.createModel = async (req, res) => {
    try {
        const created = await BaseCrud.create(modelDb, req.body);
        res.send(created);
    } catch (err) {
        handleApiError(res, err);
    }
};
exports.findAllModel = async (req, res) => {
    try {
        const elements = await BaseCrud.findAll(modelDb);
        res.send(elements);
    } catch(err) {
        handleApiError(res, err);
    }
};
