const createUserInfoAndPayload = (user) => ({
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
  },
});

module.exports = {
  createUserInfoAndPayload,
};
