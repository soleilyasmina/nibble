const User = require('../models/user');

const createUserInfoAndPayload = async (user) => ({
  payload: {
    id: user._id,
    email: user.email,
    username: user.username,
  },
  userInfo: {
    id: user._id,
    active: user.active,
    email: user.email,
    nibbles: user.nibbles,
    username: user.username,
    following: user.following,
    blocking: user.blocking,
    followers: await user.followers(),
  },
});

const canViewUser = async (req, res, next) => {
  const user = await User.findById(res.locals.user.id);
  if (user.isBlocked(req.params.user_id)) {
    return res.status(400).json({ error: 'Cannot view.' });
  }
  return next();
};

module.exports = {
  createUserInfoAndPayload,
  canViewUser,
};
