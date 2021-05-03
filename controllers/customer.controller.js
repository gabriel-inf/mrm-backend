const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const db = require("../models");
const handleApiError = require("./utils/apiErrorHandler");
const { Op } = require("sequelize");
const logger = require("../utils/logger");
const { hasInvalidQuery } = require("./utils/queryValidator");
const { isInvalidId, isIdNotPresent } = require("./utils/genericBodyValidator");
const { addXTotalCount } = require("./utils/headerHelper");
const model = db.Customer;

// create new customer
exports.create = (req, res) => {
  model.create({
    companyName: req.body.companyName,
    cnpj: req.body.cnpj,
    cpf: req.body.cpf,
    phoneNumber: req.body.phoneNumber,
    mobilePhoneNumber: req.body.mobilePhoneNumber,
    email: req.body.email,
    active: req.body.active,
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
      res.send(customer);
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
    truncate: true
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

  const newCustomerAttributes = {
    companyName: req.body.companyName,
    cnpj: req.body.cnpj,
    cpf: req.body.cpf,
    phoneNumber: req.body.phoneNumber,
    mobilePhoneNumber: req.body.mobilePhoneNumber,
    email: req.body.email,
    active: req.body.active
  }

  const newAddressAttributes = {
    street: req.body.address.street,
    cep: req.body.address.cep,
    city: req.body.address.city,
    number: req.body.address.number
  };

  var customer = await model.findOne(filter);
  customer.address.update(newAddressAttributes);
  customer.update(newCustomerAttributes);
  res.send(customer);
};
