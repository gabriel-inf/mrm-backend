const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const db = require("../models");
const handleApiError = require("./utils/apiErrorHandler");
const { Op } = require("sequelize");
const logger = require("../utils/logger");
const { hasInvalidQuery } = require("./utils/queryValidator");
const { isInvalidId, isIdNotPresent } = require("./utils/genericBodyValidator");
const { addXTotalCount } = require("./utils/headerHelper");
const model = db.StockItem;
const ItemService = require("../service/item.service");
const { MAINTENANCE, INVENTORY } = require("../utils/itemConstants");
const BaseCrud = require("../service/BaseCrud");

// create new item
exports.create = async (req, res) => {

  try {
    const createdItem = await BaseCrud.create(model, req.body, [db.ProductModel]);
    res.status(StatusCodes.CREATED);
    res.send(createdItem);
  } catch (err) {
    handleApiError(res, err);
  }
};

// get all items
exports.findAll = async (req, res) => {
  if (hasInvalidQuery(req, res, model)) return;
  try {
    const elements = await BaseCrud.findAll(model, req.query, [db.ProductModel]);
    res.headers = addXTotalCount(res, elements.length);
    res.send(elements);
  } catch(err){
    handleApiError(res, err);
  }
};

exports.findOne = async (req, res) => {
  try {
    if (await isInvalidId(req, res, model)) return;
    const item = await BaseCrud.findOne(model, req.params.id, [db.ProductModel]);
    res.send(item);
  } catch (err) {
    handleApiError(res, err);
  }
};

exports.deleteOne = async (req, res) => {
  if (await isInvalidId(req, res, model)) return;
  await BaseCrud.deleteOne(model, req.params.id);
  res.status(StatusCodes.OK);
  res.send();
};

// delete all
exports.deleteAll = async (req, res) => {
  await BaseCrud.deleteAll(model);
  res.status(StatusCodes.OK);
  res.send();
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
    isReadyToBeRented: req.body.isReadyToBeRented || item.isReadyToBeRented,
    status: req.body.status || item.status,
    ProductModelId: req.body.model || item.ProductModelId
  }

  const updatedItem = await item.update(newAttributes);
  res.send(updatedItem);
};

/**
 * Method responsible for sending an item to the maintenance status and add a record to the history table
 * @param {*} req 
 * @param {*} res 
 */
exports.sendToMaintenance = async (req, res) => {
  if (await isInvalidId(req, res, model)) return;

  try {
    const histEntry = await ItemService.updateStockItemStatus(req.params.id, MAINTENANCE, req.body.comment);
    res.status(StatusCodes.OK);
    res.send(histEntry);

  } catch (err) {
    handleApiError(res, err);
  }
}


/**
 * Method responsible for releasing an item from the maintenance
 * @param {*} req 
 * @param {*} res 
 */
exports.releaseFromMaintenance = async (req, res) => {
  if (await isInvalidId(req, res, model)) return;

  try {
    const histEntry = await ItemService.updateStockItemStatus(req.params.id, INVENTORY, req.body.comment);
    res.status(StatusCodes.OK);
    res.send(histEntry);

  } catch (err) {
    handleApiError(res, err);
  }

}

/**
 * Method responsible for registering a leave for an item (inventory -> rental)
 * @param {*} req 
 * @param {*} res 
 */
exports.registerLeave = async (req, res) => {
  if (await isInvalidId(req, res, model)) return;

  try {
    const histEntry = await ItemService.registerLeave(req.params.id);
    res.status(StatusCodes.OK);
    res.send(histEntry);
  } catch (err) {
    handleApiError(res, err);
  }

}

/**
 * Method responsible for registering an arrive for an item (rental -> inventory)
 * @param {*} req 
 * @param {*} res 
 */
exports.registerArrive = async (req, res) => {
  if (await isInvalidId(req, res, model)) return;

  try {
    const histEntry = await ItemService.updateStockItemStatus(req.params.id, INVENTORY, req.body.comment);
    res.status(StatusCodes.OK);
    res.send(histEntry);
  } catch (err) {
    handleApiError(res, err);
  }

}

/**
 * Method responsible for setting the isReadyForLeave flag to true
 * It may be called when the manager enters in the system a ready rental
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setReadyForRental = async (req, res) => {
  if (await isInvalidId(req, res, model)) return;

  try {
    const updatedItem = await ItemService.setReadyForRental(req.params.id, true);
    res.status(StatusCodes.OK);
    res.send(updatedItem);
  } catch (err) {
    handleApiError(res, err);
  }

}