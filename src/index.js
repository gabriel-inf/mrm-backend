const app = require('./app');
const PORT = 3134;


async function init() {
	console.log(`Starting Express API on port ${PORT}...`);

	app.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}. Try some routes, such as '/api/customers'.`);
	});
}

init();