const Nibble = require('../models/nibble');

const modifiable = async (req, res, next) => {
  try {
    const nibble = await Nibble.findById(req.params.nibble_id);
    if (res.locals.user.id !== nibble.user_id.toString()) {
      return res.status(401).json({ error: 'Not authorized!' });
    }
    return next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  modifiable,
};
