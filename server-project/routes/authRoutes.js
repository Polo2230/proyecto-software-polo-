const express = require("express");
const authController = require("../controllers/authController.js");
const {authRequiredSecretary} = require("../middlewares/validateToken.js");
const {registerSchema, loginSchema} = require("../schemas/authSchema.js");
const {validateSchema} = require("../middlewares/validatorMiddleware.js");

const router = express.Router();

router.post(`/register`,validateSchema(registerSchema), authController.register);
router.post(`/login`,validateSchema(loginSchema), authController.login);
router.get(`/logout`, authController.logout);
router.get(`/profile`,authRequiredSecretary, authController.profile);

module.exports = {
  router,
};
