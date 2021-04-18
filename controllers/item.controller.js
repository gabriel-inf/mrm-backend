const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const db = require("../models");
const handleApiError = require("./utils/apiErrorHandler");
const { Op } = require("sequelize");
const logger = require("../utils/logger");
const { hasInvalidQuery } = require("./utils/queryValidator");
const { isInvalidId, isIdNotPresent } = require("./utils/genericBodyValidator");
const { addXTotalCount } = require("./utils/headerHelper");
const model = db.StockItem;


// create new item
exports.create = (req, res) => {
  logger.info(`model id ${req.body.model}`)
  db.StockItem.create({
    status: req.body.status,
    ProductModelId: req.body.model
  }, { include: [db.ProductModel] }).then(createdItem => {
    res.status(StatusCodes.CREATED);
    res.send(createdItem);
  }).catch((err) => {
    handleApiError(res, err);
  });
};

// get all items
exports.findAll = (req, res) => {

  if (hasInvalidQuery(req, res, model)) return;

  model.findAll({
    where: req.query,
    include: [
      {
        model: db.ProductModel
      }
    ]
  })
  .then(items => {
    res.headers = addXTotalCount(res, items.length);

    console.log(JSON.stringify(res.headers));
    res.send(items);
  })
  .catch((err) => {
    handleApiError(res, err);
  });
};

// get single customer by id
exports.findOne = (req, res) => {
  model.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: db.ProductModel
      }
    ]
  }).then(item => {
    if (item.length > 0) {
      res.send(item);
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

// delete item
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

// edit a item
exports.update = async (req, res) => {

  if (isIdNotPresent(req, res)) return;
  if (await isInvalidId(req, res, model)) return;
 
  const filter = {
    where: { id: req.params.id }
  };

  var item = await model.findOne(filter);

  const newAttributes = {
    status: req.body.status || item.status,
    ProductModelId: req.body.model || item.ProductModelId
  }

  logger.warn(JSON.stringify(newAttributes));

  const updatedItem = await item.update(newAttributes);
  res.send(updatedItem);
};