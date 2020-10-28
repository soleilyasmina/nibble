const Nibble = require('../models/nibble');
const User = require('../models/nibble');

const modifiable = async (req, res, next) => {
  try {
    const nibble = await Nibble.findById(req.params.nibble_id);
    if (nibble === null) {
      return res.status(404).json({ error: 'Nibble not found!' });
    }
    if (res.locals.user.id !== nibble.user_id.toString()) {
      return res.status(401).json({ error: 'Not authorized!' });
    }
    return next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const canViewNibble = async (req, res, next) => {
  const user = await User.findById(res.locals.user.id);
  const nibble = await Nibble.findById(req.params.nibble_id);
  if (user.isBlocked(nibble.user_id)) {
    return res.status(400).json({ error: 'Cannot view.' });
  }
  return next();
};

module.exports = {
  modifiable,
  canViewNibble,
};
