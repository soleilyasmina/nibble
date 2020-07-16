const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const restrict = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, SECRET);
    res.locals.user = user;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Not authorized!' });
  }
};

module.exports = restrict;
