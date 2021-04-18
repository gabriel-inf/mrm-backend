const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const db = require("../models");
const handleApiError = require("./utils/apiErrorHandler");
const { Op } = require("sequelize");
const logger = require("../utils/logger");


// create new customer
exports.create = (req, res) => {
  db.Customer.create({
    companyName: req.body.companyName,
    cnpj: req.body.cnpj,
    cpf: req.body.cpf,
    phoneNumber: req.body.phoneNumber,
    mobilePhoneNumber: req.body.mobilePhoneNumber,
    email: req.body.email,
    active: req.body.active,
    Address: {
      street: req.body.street,
      cep: req.body.cep,
      city: req.body.city,
      number: req.body.number
    }
  }, { include: [db.Address] }).then(createdCustomer => {
    res.status(StatusCodes.CREATED);
    res.send(createdCustomer);
  }).catch((err) => {
    handleApiError(res, err);
  });
};

// get all customers
exports.findAll = (req, res) => {

  if (req.query) {
    const queryAttributes = new Set(Object.keys(req.query));
    const possibleAttributes = new Set(Object.keys(db.Customer.rawAttributes));
    const notValidAttributes = new Set(
      [...queryAttributes].filter(x => !possibleAttributes.has(x))
    );

    if (notValidAttributes.size > 0) {
      handleApiError(res, `Not valid query parameters: ${Array.from(notValidAttributes).join(",")}`);
      return;
    }
  }

  db.Customer.findAll({
    where: req.query,
    include: [
      {
        model: db.Address
      }
    ]
  })
    .then(customers => {
      res.send(customers);
    })
    .catch((err) => {
      handleApiError(res, err);
    });
};

// get single customer by id
exports.findOne = (req, res) => {
  db.Customer.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: db.Address
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
  db.Customer.findOne({
    include: [
      {
        model: db.Address
      }
    ],
    where: {
      id: req.params.id
    }
  }).then(customer => {
    if (!!customer) {
      res.send(customer.Address);
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
exports.deleteOne = (req, res) => {
  db.Customer.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send("success"));
};

// delete all customers
exports.deleteAll = (req, res) => {
  db.Customer.destroy({
    where: {
      // all records
    },
    truncate: true
  }).then(() => res.send("success"));
};

// edit a address
exports.update = async (req, res) => {

  if (await isInvalidId(req, res)) return;
  if (isIdNotPresent(req, res)) return;

  const filter = {
    include: [
      {
        model: db.Address
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
    street: req.body.Address.street,
    cep: req.body.Address.cep,
    city: req.body.Address.city,
    number: req.body.Address.number
  };

  var customer = await db.Customer.findOne(filter);
  customer.Address.update(newAddressAttributes);
  customer.update(newCustomerAttributes);
  res.send(customer);
};


exports.findByQuery = (req, res) => {

  if (req.query) {
    console.log(query);
  }

  const filter = {
    include: [
      {
        model: db.Address
      }
    ],
    where: { id: req.params.id }
  };
};

// auxiliary functions (can be generalized)

async function isInvalidId(req, res) {
  const found = await db.Customer.count({
    where: {
      id: {
        [Op.eq]: req.params.id
      }
    }
  });
  if (found == 0) {
    res.status(StatusCodes.NOT_FOUND);
    res.send({
      message: "The given id was not found"
    });
    return true;
  }
  return false;
}

function isIdNotPresent(req, res) {
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST);
    res.send({
      message: "Parameter id is required for updates"
    });
    return true;
  }
  return false;
}
