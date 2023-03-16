const CommentService = require("../services/comments.service");

class CommentsController {
    commentService = new CommentService()

    getComments = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const comments = await this.commentService.findCommentsByPostId(postId);
            
            res.status(200).json({comments: comments});
        } catch (error) {
            next(error);
        }
    }

    createComment = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals.user;
            const { comment } = req.body;
            if (!postId || !userId || !comment) {
                throw new InvalidParamsError();
              }
            await this.commentService.createComment(postId, userId, comment);
            res.status(201).json({ message: "댓글을 작성하였습니다." });
        } catch (error) {
            next(error);
        }
    }

    updateComment = async (req, res, next) => {
        try {
            const { comment } = req.body;
            const { userId } = res.locals.user;
            const { postId, commentId } = req.params;
            if (!postId || !userId || !comment || !commentId) {
                throw new InvalidParamsError();
              }
            await this.commentService.updateComment(commentId, userId, postId, comment);
            res.status(200).json({message: "댓글을 수정하였습니다."});
        } catch (error) {
            next(error);
        }
    }

    deleteComment = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { postId, commentId } = req.params;
            if (!postId || !userId || !commentId) {
                throw new InvalidParamsError();
              }
            await this.commentService.deleteComment(commentId, userId, postId);
            res.status(200).json({message: "댓글을 삭제하였습니다."});
        } catch (error) {
            next(error);
        }
    }
};

module.exports = CommentsController;