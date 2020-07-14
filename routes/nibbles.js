const { Router } = require('express');

const nibbleRouter = Router();

nibbleRouter.get('/', (req, res) => res.json('All nibbles reached!'));
nibbleRouter.get('/:id', (req, res) => res.json('One nibble reached!'));
nibbleRouter.post('/', (req, res) => res.json('New nibble reached!'));
nibbleRouter.post('/:id', (req, res) => res.json('New bite reached!'));
nibbleRouter.put('/:id', (req, res) => res.json('Update nibble reached!'));
nibbleRouter.delete('/:id', (req, res) => res.json('Remove nibble reached!'));

module.exports = nibbleRouter;
