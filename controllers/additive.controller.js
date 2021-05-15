const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const db = require("../models");
const handleApiError = require("./utils/apiErrorHandler");
const { hasInvalidQuery } = require("./utils/queryValidator");
const { isInvalidId, isIdNotPresent } = require("./utils/genericBodyValidator");
const { addXTotalCount } = require("./utils/headerHelper");


exports.create = (req, res) => {
  db.additive.create({
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    approvalDate: req.body.approvalDate,
    paymentDueDate: req.body.paymentDueDate,
    paidAt: req.body.paidAt,
    contractUrl: req.body.contractUrl,
    value: req.body.value,
    status: req.body.status,
    comment: req.body.comment,
    rentContractId: req.body.rentContractId,
    invoiceNumber: req.body.invoiceNumber,
    invoiceStatus: req.body.invoiceStatus,
    invoiceUrl: req.body.invoiceUrl,
    paymentType: req.body.paymentType,
    paymentComment: req.body.paymentComment,
    contractNumber: req.body.contractNumber,
    installments: req.body.installments,
    period: req.body.period
  }).then(async (createdItem) => {
    var rentContract = await db.rentContract.findOne({where: {id: createdItem.rentContractId}});
    await rentContract.update({
      endDate: createdItem.endDate
    })
    res.status(StatusCodes.CREATED);
    res.send(createdItem);
  }).catch((err) => {
    handleApiError(res, err);
  });
};

exports.findAll = (req, res) => {
  if (hasInvalidQuery(req, res, db.additive)) return;

  db.additive.findAll({
    include: [{
      model: db.rentContract,
      include: [db.customer]
    }]
  }).then(items => {
    res.headers = addXTotalCount(res, items.length);
    console.log(JSON.stringify(res.headers));
    res.send(items);
  })
  .catch((err) => {
    handleApiError(res, err);
  });
};

exports.findOne = (req, res) => {
  db.additive.findAll({
    where: {id: req.params.id},
    include: [{
      model: db.rentContract,
      include: [db.customer, db.itemRental]
    }]
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
  if (await isInvalidId(req, res, db.additive)) return;
  db.additive.destroy({
    where: {id: req.params.id}
  })
  .then(() => {
    res.status(StatusCodes.OK);
    res.send()
  });
};

exports.deleteAll = (req, res) => {
  db.additive.destroy({
    where: {}
  }).then(() => {
    res.status(StatusCodes.OK);
    res.send()
  });
};

exports.update = async (req, res) => {

  if (isIdNotPresent(req, res)) return;
  if (await isInvalidId(req, res, db.additive)) return;

  const filter = {
    where: { id: req.params.id }
  };

  var additive = await db.additive.findOne(filter);

  const newAttributes = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    approvalDate: req.body.approvalDate,
    paymentDueDate: req.body.paymentDueDate,
    paidAt: req.body.paidAt,
    contractUrl: req.body.contractUrl,
    value: req.body.value,
    status: req.body.status,
    rentContractId: req.body.rentContractId,
    comment: req.body.comment,
    invoiceNumber: req.body.invoiceNumber,
    invoiceStatus: req.body.invoiceStatus,
    invoiceUrl: req.body.invoiceUrl,
    paymentType: req.body.paymentType,
    paymentComment: req.body.paymentComment,
    contractNumber: req.body.contractNumber,
    installments: req.body.installments,
    period: req.body.period
  }

  additive.update(newAttributes)
  .then(updatedItem => {
    res.status(StatusCodes.CREATED);
    res.send(updatedItem);
  }).catch((err) => {
    handleApiError(res, err);
  });
};