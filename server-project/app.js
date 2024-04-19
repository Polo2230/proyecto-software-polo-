const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes.js");
const cookieParser = require("cookie-parser");
const userRoutes=require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const { API_VERSION } = require("./config.js");

const cors = require('cors');
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(`/${API_VERSION}/products`, productRoutes);

app.use(`/${API_VERSION}/users`, userRoutes);

app.use(`/${API_VERSION}/auth`, authRoutes.router);


module.exports = app;
