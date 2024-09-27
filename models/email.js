const mongoose = require("mongoose");
const { v4 } = require("uuid");

const queuedEmailSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: () => v4(),
  },
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "pending", // pending, sent, failed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QueuedEmail", queuedEmailSchema);
