const { createFeedback, listFeedback } = require("../services/feedbackService");

function postFeedback(req, res) {
  const result = createFeedback(req.body || {});
  return res.status(result.status).json(result);
}

function getFeedback(req, res) {
  return res.json({
    ok: true,
    count: listFeedback().length,
    feedback: listFeedback()
  });
}

module.exports = {
  getFeedback,
  postFeedback
};
