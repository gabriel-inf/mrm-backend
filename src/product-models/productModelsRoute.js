const { getIdParam } = require('../utils/helpers');
const productModelDb = require('../utils/mockDAO');

async function getAll(req, res) {
	const elements = productModelDb.findAll();
	res.status(200).json(elements);
};

async function getById(req, res) {
	const id = getIdParam(req);
	console.log("get by id: ", id);
	const element = productModelDb.findByPk(id);

	console.log(element);
	if (!!element && element.length > 0) {
		res.status(200).json(element);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await productModelDb.create(req.body);
		res.status(201).end();
	}
};

async function update(req, res) {
	const id = getIdParam(req);

	if (req.body.id === id) {
		await productModelDb.update(req.body, {
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
	productModelDb.remove(id);
	res.status(200).end();
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
