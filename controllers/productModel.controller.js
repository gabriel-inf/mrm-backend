const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const db = require("../models");
const handleApiError = require("./utils/apiErrorHandler");
const logger = require("../utils/logger");
const { hasInvalidQuery } = require("./utils/queryValidator");
const { isInvalidId, isIdNotPresent } = require("./utils/genericBodyValidator");
const { addXTotalCount } = require("./utils/headerHelper");
const model = db.ProductModel;


// create new product model
exports.create = (req, res) => {
  logger.info(`model id ${req.body.model}`)
  model.create({
    name: req.body.name,
    type: req.body.type,
    power: req.body.power,
    model: req.body.model,
    brand: req.body.brand,
    standardRentalValue: req.body.standardRentalValue,
    repositionValue: req.body.repositionValue,
    image: req.body.image
  }).then(createProductModel => {
    res.status(StatusCodes.CREATED);
    res.send(createProductModel);
  }).catch((err) => {
    handleApiError(res, err);
  });
};

// get all product models
exports.findAll = (req, res) => {

  if (hasInvalidQuery(req, res, model)) return;

  model.findAll({
    where: req.query
  })
  .then(productModels => {
    res.headers = addXTotalCount(res, productModels.length);

    console.log(JSON.stringify(res.headers));
    res.send(productModels);
  })
  .catch((err) => {
    handleApiError(res, err);
  });
};

// get single productModel by id
exports.findOne = (req, res) => {
  model.findAll({
    where: {
      id: req.params.id
    }
  }).then(productModel => {
    if (productModel.length > 0) {
      res.send(productModel[0]);
    } else {
      res.status(StatusCodes.NOT_FOUND);
      res.send(
        {
          "message": getReasonPhrase(StatusCodes.NOT_FOUND),
          "id": req.params.id
        }
      );
    }
  })
    .catch(err => {
      handleApiError(res, err);
    });
};

// delete productModel
exports.deleteOne = async (req, res) => {
  if (await isInvalidId(req, res, model)) return;
  model.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.send("success"));
};

// delete all
exports.deleteAll = (req, res) => {
  model.destroy({
    where: {
      // all records
    },
    truncate: true
  }).then(() => res.send("success"));
};

// edit a productModel
exports.update = async (req, res) => {

  if (isIdNotPresent(req, res)) return;
  if (await isInvalidId(req, res, model)) return;
 
  const filter = {
    where: { id: req.params.id }
  };

  var productModel = await model.findOne(filter);

  const newAttributes = {
    name: req.body.name || productModel.name,
    type: req.body.type || productModel.type,
    power: req.body.power || productModel.power,
    model: req.body.model || productModel.model,
    standardRentalValue: req.body.standardRentalValue || productModel.standardRentalValue,
    repositionValue: req.body.repositionValue || productModel.repositionValue,
    image: req.body.image || productModel.image,
    brand: req.body.brand || productModel.brand
  }

  logger.warn(JSON.stringify(newAttributes));

  const updatedProductModel = await productModel.update(newAttributes);
  res.send(updatedProductModel);
};