const productController = require("../controllers/productController.js");
const {authRequiredSecretary} = require('../middlewares/validateToken.js');
const express = require("express");
const router = express.Router();

const {createProductSchema} = require("../schemas/productSchema.js");
const {validateSchema} = require("../middlewares/validatorMiddleware.js");

// Ruta para crear un producto
router.post("/new-product", validateSchema(createProductSchema), productController.createProduct);

// Ruta para obtener todos los productos
router.get("/" ,productController.getAllProducts);

// Ruta para obtener un producto por su ID
router.get("/product/:id", productController.getProductById);

// Ruta para actualizar un producto por su ID
router.put("/product/:id",productController.updateProduct);

// Ruta para eliminar un producto por su ID
router.delete("/product/:id", productController.deleteProduct);

module.exports = router;