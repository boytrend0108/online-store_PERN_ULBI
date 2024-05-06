require('dotenv/config');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');

const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      next(ApiError.badRequest('Wrong email or password'));
      return;
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('User already exist'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPassword, role });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJWT(user.id, email, role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(ApiError.badRequest('User not found'));
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.badRequest('Wrong password'));
    }

    const token = generateJWT(user.id, email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJWT(req.user.id, req.user.email, req.user.role);
    res.json({ token });
  }
}

module.exports = new UserController();
