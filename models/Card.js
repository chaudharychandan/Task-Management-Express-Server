const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = cardSchema;
