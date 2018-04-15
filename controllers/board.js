const mongoose = require('mongoose');
const Board = require('../models/Board');

module.exports = {
  async index(req, res, next) {
    try {
      const boards = await Board.find();
      res.send(boards);
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    const { params: { id } } = req;
    try {
      const board = await Board.findById(id);
      sendResponse(res, board);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    const { body } = req;
    try {
      let board = new Board(body);
      board = await board.save();
      res.send(board);
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    const { params: { id } } = req;
    try {
      const board = await Board.findById(id);
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
