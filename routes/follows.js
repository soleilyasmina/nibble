const { Router } = require('express');

const {
  follow, unfollow, block, unblock,
} = require('../controllers/follows');
const { restrict } = require('../helpers');
const { canViewUser } = require('../helpers/user');

const router = Router();

router.post('/:user_id/follow', restrict, canViewUser, follow);
router.delete('/:user_id/unfollow', restrict, canViewUser, unfollow);
router.post('/:user_id/block', restrict, canViewUser, block);
router.delete('/:user_id/unblock', restrict, canViewUser, unblock);

module.exports = router;
