const mongoose = require('mongoose');

const DB_URI = process.env.PROD_MONGODB || 'mongodb://127.0.0.1:27017/nibble_development';
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(DB_URI, options)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch((e) => console.error(`You received the following error: ${e.message}`));

const db = mongoose.connection;

module.exports = db;
