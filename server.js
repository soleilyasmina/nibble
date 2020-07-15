const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('dotenv').config();

require('./db');
const api = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/api', api);

app.listen(PORT, () => console.log(`Listening on Port ${PORT}!`));
