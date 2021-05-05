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
const itemRoute = require("./routes/item.route");
const productModelRoute = require("./routes/productModel.route");
const itemCustomAttributesRoute = require("./routes/itemCustomAttributes.route");

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
  app.use("/api/productModels", productModelRoute);
  app.use("/api/itemCustomAttributes/", itemCustomAttributesRoute);

  logger.info("Routes successfully added");
}