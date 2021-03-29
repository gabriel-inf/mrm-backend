const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
var cors = require('cors');

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'mrm API', 	
      version: '0.0.1',
      description: 'Documentation for mrm APIs',
    },
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['./customers/*.js', './*.js'],
};

const specs = swaggerJsdoc(options);


const routes = {
    customers: require('./customers/customersRoute'),
    suppliers: require('./suppliers/suppliersRoute'),
    rentals: require('./rentals/rentalsRoute'),
    productModels: require('./product-models/productModelsRoute'),
    stockItems: require('./stock-items/stockItemsRoute')
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

function makeHandlerAwareOfAsyncErrors(handler) {
    return async function (req, res, next) {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    };
}

app.get('/', (req, res) => {
	res.send(`<h2>Hello World!</h2>`);
});

// We define the standard REST APIs for each route (if they exist).
for (const [routeName, routeController] of Object.entries(routes)) {
	if (routeController.getAll) {
		app.get(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.getAll)
		);
	}
	if (routeController.getById) {
		app.get(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.getById)
		);
	}
	if (routeController.create) {
		app.post(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.create)
		);
	}
	if (routeController.update) {
		app.put(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.update)
		);
	}
	if (routeController.remove) {
		app.delete(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.remove)
		);
	}
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;