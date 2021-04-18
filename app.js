const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3134;
const cors = require("cors");
const morgan = require('morgan');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// import routes
const addressRoute = require("./routes/address.route");
const customerRoute = require("./routes/customer.route");

// use routes
app.use("/api/addresses", addressRoute);
app.use("/api/customers", customerRoute);

// sync db and then starts listening to  port
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});
