const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

function setMessage(text, type = "info") {
  message.textContent = text;
  message.dataset.type = type;
}

function clearMessage() {
  setMessage("", "info");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateForm() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const errors = [];

  if (!email) {
    errors.push("Email is required.");
  } else if (!isEmail(email)) {
    errors.push("Enter a valid email address.");
  }

  if (!password) {
    errors.push("Password is required.");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    values: { email, password }
  };
}

function setLoading(isLoading) {
  const button = form.querySelector("button[type='submit']");
  button.disabled = isLoading;
  button.textContent = isLoading ? "Signing in..." : "Sign in";
}

async function submitLogin(values) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  });

  return response.json();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();

  const validation = validateForm();

  if (!validation.isValid) {
    setMessage(validation.errors.join(" "), "error");
    return;
  }

  try {
    setLoading(true);
    setMessage("Checking login details...", "info");

    const result = await submitLogin(validation.values);

    if (!result.ok) {
      setMessage(result.message || "Login failed.", "error");
      return;
    }

    setMessage(`Welcome, ${result.user.name}. Demo login completed.`, "success");
  } catch (error) {
    console.error("Login request failed:", error);
    setMessage("Could not reach the login service. Try again later.", "error");
  } finally {
    setLoading(false);
  }
});
