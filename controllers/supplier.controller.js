const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const db = require("../models");
const handleApiError = require("./utils/apiErrorHandler");
const { Op } = require("sequelize");
const logger = require("../utils/logger");
const { hasInvalidQuery } = require("./utils/queryValidator");
const { isInvalidId, isIdNotPresent } = require("./utils/genericBodyValidator");
const { addXTotalCount } = require("./utils/headerHelper");
const model = db.stockItem;
const ItemService = require("../service/item.service");


exports.create = (req, res) => {
  logger.info(`model id ${req.body.model}`)
  db.stockItem.create({
    status: req.body.status,
    ProductModelId: req.body.model
  }, { include: [db.productModel] }).then(createdItem => {
    res.status(StatusCodes.CREATED);
    res.send(createdItem);
  }).catch((err) => {
    handleApiError(res, err);
  });
};

exports.findAll = (req, res) => {

  if (hasInvalidQuery(req, res, model)) return;

  model.findAll({
    where: req.query,
    include: [
      {
        model: db.productModel
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

exports.findOne = (req, res) => {
  model.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: db.productModel
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

exports.deleteOne = async (req, res) => {
  if (await isInvalidId(req, res, model)) return;
  model.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.send("success"));
};

exports.deleteAll = (req, res) => {
  model.destroy({
    where: {
      // all records
    },
    truncate: true
  }).then(() => res.send("success"));
};

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

  const updatedItem = await item.update(newAttributes);
  res.send(updatedItem);
};
