const mongoose = require('mongoose');
const { Board } = require('../models');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  async index(req, res, next) {
    try {
      const { user: { id } } = req;
      const boards = await Board.find({ userId: ObjectId(id) });
      res.send(boards);
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    const { params: { id }, user } = req;
    try {
      const board = await Board.findOne({ _id: id, userId: ObjectId(user.id) });
      sendResponse(res, board);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    const { body, user: { id } } = req;
    Object.assign(body, { userId: id });
    try {
      let board = new Board(body);
      board = await board.save();
      res.send(board);
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    const { params: { id }, user } = req;
    try {
      const board = await Board.findOne({ _id: id, userId: ObjectId(user.id) });
      if (!board) {
        return res.sendStatus(404);
      }
      await board.remove();
      sendResponse(res, board);
    } catch (error) {
      next(error);
    }
  }
};


const sendResponse = (res, board) => {
  if (board) {
    res.send(board);
  } else {
    res.sendStatus(404);
  }
}
