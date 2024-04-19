const userController = require("../controllers/userController.js");
const {authRequiredAdmin} = require("../middlewares/validateToken.js");
const {register} = require("../controllers/authController.js");
const express = require("express");
const router = express.Router();
const {registerSchema} = require("../schemas/authSchema.js");
const {validateSchema} = require("../middlewares/validatorMiddleware.js");


// Ruta para crear un usuario
router.post("/new-user",validateSchema(registerSchema), register);

// Ruta para obtener todos los usuarios
router.get("/",userController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get("/user/:id",userController.getUserById);

// Ruta para actualizar un usuario por su ID
router.patch("/user/:id", userController.updateUser);

// Ruta para eliminar un usuario por su ID
router.delete("/user/:id",userController.deleteUser);

module.exports = router;