const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const db = require("../models");
const handleApiError = require("./utils/apiErrorHandler");
const { Op } = require("sequelize");
const logger = require("../utils/logger");
const { hasInvalidQuery } = require("./utils/queryValidator");
const { isInvalidId, isIdNotPresent } = require("./utils/genericBodyValidator");
const { addXTotalCount } = require("./utils/headerHelper");
const model = db.customer;

// create new customer
exports.create = (req, res) => {
  model.create({
    name: req.body.name,
    commercialName: req.body.commercialName,
    cnpj: req.body.cnpj,
    mobilePhone: req.body.mobilePhone,
    email: req.body.email,
    active: req.body.active,
    comment: req.body.comment,
    address: {
      street: req.body.street,
      cep: req.body.cep,
      city: req.body.city,
      number: req.body.number
    }
  }, { include: [db.address] }).then(createdCustomer => {
    res.status(StatusCodes.CREATED);
    res.send(createdCustomer);
  }).catch((err) => {
    handleApiError(res, err);
  });
};

// get all customers
exports.findAll = (req, res) => {

  if (hasInvalidQuery(req, res, model)) return;

  model.findAll({
    where: req.query,
    nested: true,
    
    include: [
      {
        model: db.address
      }
    ]
  })
    .then(customers => {
      addXTotalCount(res, customers.length)
      res.send(customers);
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
        model: db.address
      }
    ]
  }).then(customer => {
    if (customer.length > 0) {
      res.send(customer[0]);
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

exports.findOneAddress = (req, res) => {
  model.findOne({
    include: [
      {
        model: db.address
      }
    ],
    where: {
      id: req.params.id
    }
  }).then(customer => {
    if (!!customer) {
      res.send(customer.address);
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

// delete customer
exports.deleteOne = async (req, res) => {
  if (await isInvalidId(req, res, model)) return;
  model.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send());
};

// delete all customers
exports.deleteAll = (req, res) => {
  model.destroy({
    where: {
      // all records
    },
    truncate: true,
    cascade: true
  }).then(() => res.send());
};

// edit a address
exports.update = async (req, res) => {

  if (isIdNotPresent(req, res)) return;
  if (await isInvalidId(req, res, model)) return;

  const filter = {
    include: [
      {
        model: db.address
      }
    ],
    where: { id: req.params.id }
  };

  var customer = await model.findOne(filter);

  const newAttributes = {
    name: req.body.name,
    commercialName: req.body.commercialName,
    cnpj: req.body.cnpj,
    mobilePhone: req.body.mobilePhone,
    email: req.body.email,
    active: req.body.active
  }

  customer.update(newAttributes)
  .then(updatedItem => {
    res.status(StatusCodes.CREATED);
    res.send(updatedItem);
  }).catch((err) => {
    handleApiError(res, err);
  });
};
