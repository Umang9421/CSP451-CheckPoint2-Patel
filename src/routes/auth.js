const express = require("express");

const { authenticateUser, validateLoginInput } = require("../services/authService");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  const result = authenticateUser(email, password);

  return res.status(result.status).json(result);
});

router.post("/validate", (req, res) => {
  const { email, password } = req.body || {};
  const validation = validateLoginInput(email, password);

  return res.status(validation.isValid ? 200 : 400).json({
    ok: validation.isValid,
    errors: validation.errors
  });
});

module.exports = { router };
