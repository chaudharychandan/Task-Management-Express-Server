const mongoose = require('mongoose');
const List = require('../models/List');

module.exports = {
  async index(req, res, next) {
    const { query: { boardId } } = req;
    let query = boardId ? { boardId } : {};
    try {
      const lists = await List.find(query);
      res.send(lists);
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    const { params: { id } } = req;
    try {
      const list = await List.findById(id);
      sendResponse(res, list);
    } catch(error) {
      next(error);
    }
  },
  async create(req, res, next) {
    const { body } = req;
    try {
      let list = new List(body);
      list = await list.save();
      res.send(list);
    } catch(error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    const { params: { id } } = req;
    try {
      const list = await List.findById(id);
      if (!list) {
        return res.sendStatus(404);
      }
      await list.remove();
      sendResponse(res, list);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    const { params: { id }, body } = req;
    const { _id } = body;
    try {
      if (_id) {
        const list = await List.findByIdAndUpdate({
          _id: id
        }, {
          $pull: {
            cards: { _id }
          }
        }, {
          new: true
        });

        res.send(list);
      } else {
        const list = await List.findByIdAndUpdate({
          _id: id
        }, {
          $push: {
            cards: body
          }
        }, {
          new: true
        });
        
        res.send(list);
      }
    } catch (error) {
      next(error);
    }
  }
};

const sendResponse = (res, list) => {
  if (list) {
    res.send(list);
  } else {
    res.sendStatus(404);
  }
}
