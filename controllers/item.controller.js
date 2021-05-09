const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const db = require("../models");
const handleApiError = require("./utils/apiErrorHandler");
const { Op } = require("sequelize");
const logger = require("../utils/logger");
const { hasInvalidQuery } = require("./utils/queryValidator");
const { isInvalidId, isIdNotPresent } = require("./utils/genericBodyValidator");
const { addXTotalCount } = require("./utils/headerHelper");
const ItemService = require("../service/item.service");
const { MAINTENANCE, INVENTORY } = require("../utils/itemConstants");
const BaseCrud = require("../service/BaseCrud");

exports.create = (req, res) => {
  db.stockItem.create({
    name: req.body.name,
    type: req.body.type,
    power: req.body.power,
    brand: req.body.brand,
    model: req.body.model,
    status: req.body.status,
    numberOfUses: req.body.numberOfUses,
    lastMaintenance: req.body.lastMaintenance,
    acquisitionDate: req.body.acquisitionDate,
    needsMaintenance: req.body.needsMaintenance,
    imageURL: req.body.imageURL,
    rentValue: req.body.rentValue,
    replacementCost: req.body.replacementCost,
    code: req.body.code,
    comment: req.body.comment,
    supplierId: req.body.supplierId,
    stockItemEvents: [{
      status: req.body.status,
      comment: req.body.statusComment
    }]
  },{
    include: [db.stockItemEvent]
  }).then(createdItem => {
    res.status(StatusCodes.CREATED);
    res.send(createdItem);
  }).catch((err) => {
    handleApiError(res, err);
  });
};

exports.findAll = async (req, res) => {
  if (hasInvalidQuery(req, res, db.stockItem)) return;

  db.stockItem.findAll()
  .then(items => {
    res.headers = addXTotalCount(res, items.length);
    console.log(JSON.stringify(res.headers));
    res.send(items);
  })
  .catch((err) => {
    handleApiError(res, err);
  });
};

exports.findOne = async (req, res) => {
  db.stockItem.findAll({
    where: {id: req.params.id},
    include: [db.supplier, db.stockItemEvent]
  }).then(item => {
    if (item.length > 0) {
      res.send(item[0]);
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
  if (await isInvalidId(req, res, db.stockItem)) return;
  db.stockItem.destroy({
    where: {id: req.params.id}
  })
  .then(() => res.send());
};

// delete all
exports.deleteAll = async (req, res) => {
  db.stockItem.destroy({
    where: {},
    truncate: true,
    cascade: true
  }).then(() => res.send());
};

// edit a item
exports.update = async (req, res) => {
  if (isIdNotPresent(req, res)) return;
  if (await isInvalidId(req, res, db.stockItem)) return;
 
  const filter = {
    where: { id: req.params.id }
  };

  var stockItem = await db.stockItem.findOne(filter);

  const newAttributes = {
    name: req.body.name || stockItem.name,
    type: req.body.type || stockItem.type,
    power: req.body.power || stockItem.power,
    brand: req.body.brand || stockItem.brand,
    model: req.body.model || stockItem.model,
    status: req.body.status || stockItem.status,
    numberOfUses: req.body.numberOfUses || stockItem.numberOfUses,
    lastMaintenance: req.body.lastMaintenance || stockItem.lastMaintenance,
    acquisitionDate: req.body.acquisitionDate || stockItem.acquisitionDate,
    imageURL: req.body.imageURL || stockItem.imageURL,
    rentValue: req.body.rentValue || stockItem.rentValue,
    replacementCost: req.body.replacementCost || stockItem.replacementCost,
    code: req.body.code || stockItem.code,
    comment: req.body.comment || stockItem.comment,
    supplierId: req.body.supplierId || stockItem.supplierId
  }

  const oldStatus = stockItem.status;

  stockItem.update(newAttributes)
  .then(updatedItem => {
    if(oldStatus != updatedItem.status) {
      db.stockItemEvent.create({
        status: updatedItem.status,
        comment: req.body.statusComment,
        stockItemId: updatedItem.id
      });
    }
    res.status(StatusCodes.CREATED);
    res.send(updatedItem);
  }).catch((err) => {
    handleApiError(res, err);
  });
};