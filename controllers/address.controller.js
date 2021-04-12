const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const db = require("../models");
const handleApiError = require("./utils/apiErrorHandler");
const { Op } = require("sequelize");

// post new address
exports.create = (req, res) => {
  db.Address.create({
    street: req.body.street,
    cep: req.body.cep,
    city: req.body.city,
    number: req.body.number
  }).then(submitedAddress => {
    res.status(StatusCodes.CREATED);
    res.send(submitedAddress);
  }).catch((err) => {
    handleApiError(res, err);
  });
};

// get all addresses
exports.findAll = (req, res) => {
  db.Address.findAll()
    .then(addresses => {
      res.send(addresses);
    })
    .catch((err) => {
      handleApiError(res, err);
    });
};

// get single address by id
exports.findOne = (req, res) => {
  db.Address.findAll({
    where: {
      id: req.params.id
    }
  }).then(address => {
    if (address.length > 0) {
      res.send(address);
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


// delete address
exports.deleteOne = (req, res) => {
  db.Address.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send("success"));
};

// delete all addresses
exports.deleteAll = (req, res) => {
  db.Address.destroy({
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

  db.Address.update(
    {
      street: req.body.street,
      cep: req.body.cep,
      city: req.body.city,
      number: req.body.number
    },
    {
      where: { id: req.params.id }
    }
  ).then(() => res.send("success"));
};

// auxiliary functions (can be generalized)

async function isInvalidId(req, res) {
  const found = await db.Address.count({
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