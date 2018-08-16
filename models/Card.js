const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = cardSchema;
