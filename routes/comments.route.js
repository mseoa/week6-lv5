const express = require('express');
const router = express.Router({mergeParams: true});

const authMiddleware = require('../middlewares/auth-middleware')
const CommentsController = require('../controllers/comments.controller')
const commentsController = new CommentsController();

router.get("/", commentsController.getComments);
router.post("/", authMiddleware, commentsController.createComment);
router.put("/:commentId", authMiddleware, commentsController.updateComment);
router.delete("/:commentId", authMiddleware, commentsController.deleteComment);

module.exports = router;