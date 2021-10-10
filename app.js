const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./security/jwt");
const errorHandle = require("./security/error-handle");

require("dotenv/config");

app.use(cors());
app.options("*", cors());

//Middleware
app.use(bodyParser.json());
//app.use(express.json()); //for post json Data
app.use(morgan("tiny")); //for display log request(POST /api/v1/products 200 47 - 33.627 ms)

app.use(authJwt());
app.use(errorHandle);

//Routes
const productsRoutes = require("./routers/products");
const categoriesRoutes = require("./routers/categories");
const usersRoutes = require("./routers/users");
const ordersRoutes = require("./routers/users");

const api = process.env.API_VERSION;

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connection Ready");
  })
  .catch((err) => {
    console.log(err);
  });

// //Development
// app.listen(4000, () => {
//     console.log('Server is runnning at 4000');

// })

//Production
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("Express is working " + port);
});

// শুরু করতে হবে  7. Backend Product Image & Gallery Upload
