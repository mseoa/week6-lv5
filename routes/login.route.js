const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
// const {Users} = require("../models");

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

router.post("/", loginController.userLogin);

module.exports = router;