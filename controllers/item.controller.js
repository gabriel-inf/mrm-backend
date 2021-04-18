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