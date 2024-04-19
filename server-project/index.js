const app = require("./app.js");
const dataBase = require("./db.js");

dataBase.connectDB();

require("dotenv").config();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
