const mongoose = require("mongoose");
const { DB_HOST, DB_PASSWORD, DB_USER } = require("./config.js");

const connectDB = async () => {
  try {
    await mongoose
      .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`)
      .then(() => console.log("Conectado a MongoDB"))
      .catch((error) =>
        console.log(`error al conecar a la base de datos ${error}`)
      );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDB,
};
