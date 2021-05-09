const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const db = require("../models");
const handleApiError = require("./utils/apiErrorHandler");
const { hasInvalidQuery } = require("./utils/queryValidator");
const { isInvalidId, isIdNotPresent } = require("./utils/genericBodyValidator");
const { addXTotalCount } = require("./utils/headerHelper");


exports.create = (req, res) => {
  var itemRentals = [];
  if(req.body.itemRentals) {
    var itemRentalsLength = req.body.itemRentals.length;
  } else {
    var itemRentalsLength = 0;
  }
  for(var i = 0; i < itemRentalsLength; i++) {
    var newItemRental = {
      leftAt: req.body.itemRentals[i].leftAt,
      returnedAt: req.body.itemRentals[i].returnedAt,
      value: req.body.itemRentals[i].value,
      comment: req.body.itemRentals[i].comment,
      stockItemId: req.body.itemRentals[i].stockItemId
    };
    itemRentals.push(newItemRental);
  };
  db.rentContract.create({
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    approvalDate: req.body.approvalDate,
    paymentDueDate: req.body.paymentDueDate,
    paidAt: req.body.paidAt,
    receiptUrl: req.body.receiptUrl,
    contractUrl: req.body.contractUrl,
    durationMode: req.body.durationMode,
    value: req.body.value,
    status: req.body.status,
    customerId: req.body.customerId,
    comment: req.body.comment,
    itemRentals: itemRentals
  }, {
    include: [db.itemRental]
  }).then(createdItem => {
    res.status(StatusCodes.CREATED);
    res.send(createdItem);
  }).catch((err) => {
    handleApiError(res, err);
  });
};

exports.findAll = (req, res) => {
  if (hasInvalidQuery(req, res, db.rentContract)) return;

  db.rentContract.findAll({include: [db.customer]})
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
  db.rentContract.findAll({
    where: {id: req.params.id},
    include: [
      db.customer,
      db.additive,
      {
        model: db.itemRental,
        include: [db.stockItem]
      }
    ]
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
  if (await isInvalidId(req, res, db.rentContract)) return;
  db.itemRental.destroy({
    where: {rentContractId: req.params.id}
  }).then(() => {
    db.rentContract.destroy({
      where: {id: req.params.id}
    })
    .then(() => {
      res.status(StatusCodes.OK);
      res.send()
    });
  })
};

exports.deleteAll = (req, res) => {
  db.rentContract.destroy({
    where: {},
    cascade: true,
    truncate: true
  }).then(() => {
    res.status(StatusCodes.OK);
    res.send()
  });
};

exports.update = async (req, res) => {

  if (isIdNotPresent(req, res)) return;
  if (await isInvalidId(req, res, db.rentContract)) return;
 
  const filter = {
    where: { id: req.params.id }
  };

  var rentContract = await db.rentContract.findOne(filter);

  const newAttributes = {
    startDate: req.body.startDate || rentContract.startDate,
    endDate: req.body.endDate || rentContract.endDate,
    approvalDate: req.body.approvalDate || rentContract.approvalDate,
    paymentDueDate: req.body.paymentDueDate || rentContract.paymentDueDate,
    paidAt: req.body.paidAt || rentContract.paidAt,
    receiptUrl: req.body.receiptUrl || rentContract.receiptUrl,
    contractUrl: req.body.contractUrl || rentContract.contractUrl,
    durationMode: req.body.durationMode || rentContract.durationMode,
    value: req.body.value || rentContract.value,
    status: req.body.status || rentContract.status,
    customerId: req.body.customerId || rentContract.customerId,
    comment: req.body.comment || rentContract.comment
  }

  rentContract.update(newAttributes)
  .then(updatedItem => {
    res.status(StatusCodes.CREATED);
    res.send(updatedItem);
  }).catch((err) => {
    handleApiError(res, err);
  });
};