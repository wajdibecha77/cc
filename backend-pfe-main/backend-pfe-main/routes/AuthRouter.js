const express = require("express");
const route = express.Router();
const AuthController = require("../controllers/AuthController");

route.post("/forgot-password", AuthController.forgotPassword);
route.post("/verify-reset-code", AuthController.verifyResetCode);
route.post("/reset-password", AuthController.resetPassword);

module.exports = route;
