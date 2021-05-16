const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3134;
const cors = require("cors");
const morgan = require('morgan');
const logger = require("./utils/logger");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// import routes
const addressRoute = require("./routes/address.route");
const customerRoute = require("./routes/customer.route");
const itemRoute = require("./routes/stockitem.route");
const supplierRoute = require("./routes/supplier.route");
const rentContractRoute = require("./routes/rentcontract.route");
const itemRentalRoute = require("./routes/itemrental.route");
const additiveRoute = require("./routes/additive.route");
const dbRoute = require("./routes/db.route");

addRoutesToTheApp();

// sync db and then starts listening to  port
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    logger.info(`listening on: http://localhost:${PORT}`);
  });
});


function addRoutesToTheApp() {
  logger.info("Adding routes...");

  app.use("/api/addresses", addressRoute);
  app.use("/api/customers", customerRoute);
  app.use("/api/stockItems", itemRoute);
  app.use("/api/suppliers", supplierRoute);
  app.use("/api/rentcontracts", rentContractRoute);
  app.use("/api/itemrentals", itemRentalRoute);
  app.use("/api/additives", additiveRoute);
  app.use("/db", dbRoute);
  logger.info("Routes successfully added");
}