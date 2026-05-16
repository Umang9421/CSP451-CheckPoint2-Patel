const demoUsers = [
  {
    id: 1,
    name: "Demo Student",
    email: "student@example.com",
    password: "Password123"
  }
];

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateLoginInput(email, password) {
  const errors = {};
  const cleanedEmail = normalizeEmail(email);

  if (!cleanedEmail) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(cleanedEmail)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (String(password).length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values: {
      email: cleanedEmail,
      password: String(password || "")
    }
  };
}

function findUserByEmail(email) {
  const cleanedEmail = normalizeEmail(email);
  return demoUsers.find((user) => user.email === cleanedEmail) || null;
}

function buildSessionToken(user) {
  const safeEmail = user.email.replace(/[^a-z0-9]/gi, "");
  return `demo-${user.id}-${safeEmail}-${Date.now()}`;
}

function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

function authenticateUser(email, password) {
  const validation = validateLoginInput(email, password);

  if (!validation.isValid) {
    return {
      ok: false,
      status: 400,
      message: "Login form has validation errors.",
      errors: validation.errors
    };
  }

  const user = findUserByEmail(validation.values.email);

  if (!user || user.password !== validation.values.password) {
    return {
      ok: false,
      status: 401,
      message: "Email or password is incorrect.",
      errors: { credentials: "Invalid login details." }
    };
  }

  return {
    ok: true,
    status: 200,
    message: "Login successful.",
    token: buildSessionToken(user),
    user: toPublicUser(user)
  };
}

module.exports = {
  authenticateUser,
  findUserByEmail,
  normalizeEmail,
  validateLoginInput
};
