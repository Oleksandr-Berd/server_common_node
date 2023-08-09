const express = require("express");

const ctrlMail = require("../../controllers/portfolio/nodemail")

const mailRoutes = express.Router();

mailRoutes.post("/mail", ctrlMail.sendEmail);


module.exports = mailRoutes;