const express = require("express");

const { connect } = require("../db");

const router = express.Router();

router.get("/health", (req, res) => {
  const db = connect();

  res.json({
    status: "ok",
    service: "csp451-web-starter",
    database: {
      connected: db.connected,
      driver: db.driver,
      name: db.database
    },
    time: new Date().toISOString()
  });
});

module.exports = { router };
