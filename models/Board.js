const mongoose = require('mongoose');
const { Schema } = mongoose;

const boardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  lists: [{
    type: Schema.Types.ObjectId,
    ref: 'List'
  }]
});

boardSchema.post('remove', async (doc) => {
  const List = mongoose.model('List');
  const { _id } = doc;
  await List.remove({ boardId: _id });
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
