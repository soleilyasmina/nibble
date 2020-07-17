const bcrypt = require('bcrypt');

const { createToken } = require('../helpers');
const User = require('../models/user');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({
      username,
      email,
      password_digest: password,
    });

    const userInfo = {
      id: user._id,
      username,
      email,
      nibbles: [],
    };

    const { nibbles, ...payload } = userInfo;

    const token = createToken(payload);

    return res.status(201).json({ user: userInfo, token });
  } catch (e) {
    return res.status(422).json({ error: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (await bcrypt.compare(password, user.password_digest)) {
      const userInfo = {
        username: user.username,
        email: user.email,
        nibbles: user.nibbles,
        id: user._id,
      };
      const { nibbles, ...payload } = userInfo;
      const token = createToken(payload);
      return res.status(200).json({ user: userInfo, token });
    }
    return res.status(401).json({ error: 'Not authorized!' });
  } catch (e) {
    return res.status(401).json({ error: 'Not authorized!' });
  }
};

const verify = async (req, res) => {
  try {
    const user = await User.findOne({ username: res.locals.user.username });
    const {
      username, email, _id, nibbles,
    } = user;

    const userInfo = {
      username,
      email,
      _id,
      nibbles,
    };
    return res.status(200).json({ user: userInfo });
  } catch (e) {
    return res.status(401).json({ error: e.message });
  }
};

const update = async (req, res) => {
  const { id } = res.locals.user;
  await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'No user found!' });
    }
    const userInfo = {
      username: user.username,
      email: user.email,
      nibbles: user.nibbles,
      id: user._id,
    };
    res.status(200).json({ user: userInfo });
  });
};

const remove = async (req, res) => {
  try {

  } catch (e) {

  }
};

module.exports = {
  register,
  login,
  verify,
  update,
  remove,
};
