const { Router } = require('express');

const {
  follow, unfollow, block, unblock,
} = require('../controllers/follows');
const { restrict } = require('../helpers');

const router = Router();

router.post('/:user_id/follow', restrict, follow);
router.delete('/:user_id/unfollow', restrict, unfollow);
router.post('/:user_id/block', restrict, block);
router.delete('/:user_id/unblock', restrict, unblock);

module.exports = router;
