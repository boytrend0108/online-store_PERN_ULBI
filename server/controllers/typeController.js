const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });
      res.json({ type });
    } catch (err) {
      next(err.message);
    }
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    res.json(types);
  }
}

module.exports = new TypeController();
