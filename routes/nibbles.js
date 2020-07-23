const { Router } = require('express');

const {
  allNibbles, myNibbles, oneNibble, newNibble, newBite, updateNibble, deleteNibble,
} = require('../controllers/nibbles');
const { restrict } = require('../helpers');
const { modifiable } = require('../helpers/nibble');

const nibbleRouter = Router();

nibbleRouter.get('/users/:user_id', restrict, allNibbles);
nibbleRouter.get('/', restrict, myNibbles);
nibbleRouter.get('/:nibble_id', restrict, oneNibble);
nibbleRouter.post('/', restrict, newNibble);
nibbleRouter.post('/:nibble_id', restrict, newBite);
nibbleRouter.put('/:nibble_id', restrict, modifiable, updateNibble);
nibbleRouter.delete('/:nibble_id', restrict, deleteNibble);

module.exports = nibbleRouter;
