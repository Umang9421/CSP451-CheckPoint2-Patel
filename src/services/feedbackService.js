const feedbackRecords = [];

function cleanText(value) {
  return String(value || "").trim();
}

function validateFeedback(payload = {}) {
  const errors = {};
  const name = cleanText(payload.name);
  const message = cleanText(payload.message);
  const rating = Number(payload.rating);

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length > 60) {
    errors.name = "Name must be 60 characters or less.";
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 500) {
    errors.message = "Message must be 500 characters or less.";
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.rating = "Rating must be a whole number from 1 to 5.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values: { name, message, rating }
  };
}

function createFeedback(payload) {
  const validation = validateFeedback(payload);

  if (!validation.isValid) {
    return {
      ok: false,
      status: 400,
      errors: validation.errors
    };
  }

  const record = {
    id: feedbackRecords.length + 1,
    ...validation.values,
    createdAt: new Date().toISOString()
  };

  feedbackRecords.push(record);

  return {
    ok: true,
    status: 201,
    feedback: record
  };
}

function listFeedback() {
  return feedbackRecords.map((record) => ({ ...record }));
}

module.exports = {
  createFeedback,
  listFeedback,
  validateFeedback
};
