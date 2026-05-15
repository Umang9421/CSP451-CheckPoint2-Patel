const express = require("express");

const { router: healthRouter } = require("./health");

const router = express.Router();

router.use(healthRouter);

module.exports = { router };
