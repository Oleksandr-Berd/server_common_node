const express = require("express");

const ctrlMail = require("../../controllers/portfolio/mailEcquire")

const mailRoutes = express.Router();

mailRoutes.post("/mail", ctrlMail.sendMail);


module.exports = mailRoutes;