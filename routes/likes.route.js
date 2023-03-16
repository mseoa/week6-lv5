const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth-middleware');
const LikesController = require('../controllers/likes.controller')
const likesController = new LikesController();

router.put("/posts/:postId/like", authMiddleware,likesController.updateLike)
router.get('/posts/like', authMiddleware,likesController.getMyLikedPosts)

module.exports = router;