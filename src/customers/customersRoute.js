const { getIdParam } = require('../utils/helpers');
const customerDb = require('../utils/mockDAO')("customers");
const validations = require("./validations");

async function getAll(req, res) {
	const elements = customerDb.findAll();
	res.status(200).json(elements);
};

async function getById(req, res) {
	const id = getIdParam(req);
	console.log("get by id: ", id);
	const element = customerDb.findByPk(id);

	console.log(element);
	if (!!element && element.length > 0) {
		res.status(200).json(element);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {

	let {missingFields, fieldsWithWrongValue} = await validations.validateCreate(req.body);
	const isValidBody = missingFields.length == 0 && fieldsWithWrongValue.length == 0;

	console.log("missingFields", missingFields);
	console.log("fieldsWithWrongValue", fieldsWithWrongValue.map(values => values.shouldBe));

	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`);
	} else if (!isValidBody) {
		let errorMessage = 
		`Bad request: the payload for Customers has wrong data:
		${missingFields.length > 0 ? "Missing fields: " + missingFields.join(',') : ""}
		${fieldsWithWrongValue.length > 0 ? "Fields with wrong values: " + fieldsWithWrongValue.map(wrongValue => wrongValue.parameter + ": " +  wrongValue.shouldBe.values.join(',') ).join("\n\t\t\t-") : ""}
		`
		res.status(422).send(errorMessage);
	}
	else {
		const created = await customerDb.create(req.body);
		res.send(created);
		res.status(201).end();
	}
};

async function update(req, res) {
	const id = getIdParam(req);

	if (req.body.id === id) {
		await customerDb.update(req.body, {
			where: {
				id: id
			}
		});
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function remove(req, res) {
	const id = getIdParam(req);
	customerDb.remove(id);
	res.status(200).end();
};

async function validate(action) {
	return validations.validate(action);
};


module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
	validate
};
