const { Router } = require('express');

const {
  allNibbles, myNibbles, oneNibble, newNibble, newBite, updateNibble, deleteNibble, followingNibbles,
} = require('../controllers/nibbles');
const { restrict } = require('../helpers');
const { canViewNibble, modifiable } = require('../helpers/nibble');
const { canViewUser } = require('../helpers/user');

const nibbleRouter = Router();

nibbleRouter.get('/users/:user_id', restrict, canViewUser, allNibbles);
nibbleRouter.get('/', restrict, myNibbles);
nibbleRouter.get('/following', restrict, followingNibbles);
nibbleRouter.get('/:nibble_id', restrict, canViewNibble, oneNibble);
nibbleRouter.post('/', restrict, newNibble);
nibbleRouter.post('/:nibble_id', restrict, canViewNibble, newBite);
nibbleRouter.put('/:nibble_id', restrict, modifiable, updateNibble);
nibbleRouter.delete('/:nibble_id', restrict, modifiable, deleteNibble);

module.exports = nibbleRouter;
