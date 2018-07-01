const mongoose = require('mongoose');
const { List } = require('../models');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  async index(req, res, next) {
    const { query: { boardId }, user: { id } } = req;
    let query = boardId ? { boardId } : {};
    Object.assign(query, { userId: ObjectId(id) })
    try {
      const lists = await List.find(query);
      res.send(lists);
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    const { params: { id }, user } = req;
    try {
      const list = await List.findOne({ _id: id, userId: ObjectId(user.id) });
      sendResponse(res, list);
    } catch(error) {
      next(error);
    }
  },
  async create(req, res, next) {
    const { body, user: { id } } = req;
    Object.assign(body, { userId: id });
    try {
      let list = new List(body);
      list = await list.save();
      res.send(list);
    } catch(error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    const { params: { id }, user } = req;
    try {
      const list = await List.findOne({ _id: id, userId: ObjectId(user.id) });
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
    const { params: { id }, body, user } = req;
    const { _id } = body;
    try {
      if (_id) {
        const list = await List.findOneAndUpdate({
          _id: id,
          userId: ObjectId(user.id)
        }, {
          $pull: {
            cards: { _id }
          }
        }, {
          new: true
        });

        res.send(list);
      } else {
        const list = await List.findOneAndUpdate({
          _id: id,
          userId: ObjectId(user.id)
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
