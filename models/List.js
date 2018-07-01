const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = require('./Card');

const listSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  createdAt: { type: Date, default: Date.now },
  cards: [cardSchema]
});

listSchema.post('remove', async (doc) => {
  const Board = mongoose.model('Board');
  const { _id, boardId } = doc;
  await Board.update({
    _id: boardId
  }, {
    $pull: { lists: _id }
  });
});

listSchema.post('save', async (doc) => {
  const Board = mongoose.model('Board');
  const { _id, boardId } = doc;
  await Board.update({
    _id: boardId
  }, {
    $push: { lists: _id }
  });
});

const List = mongoose.model('List', listSchema);

module.exports = List;
