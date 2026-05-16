const express = require("express");

const { router: feedbackRouter } = require("./feedback");
const { router: healthRouter } = require("./health");

const router = express.Router();

router.use(healthRouter);
router.use(feedbackRouter);

module.exports = { router };
