const CommentRepository = require('../repositories/comments.repository');

class CommentService {
    commentRepository = new CommentRepository();

    findCommentsByPostId = async (postId) => {
        const allComment = await this.commentRepository.findCommentsByPostId(postId);

        return allComment;
    }

    createComment = async (postId, userId, comment) => {
        const findPost = await this.commentRepository.findPostById(postId);
        if (!findPost) throw new Error("게시글이 존재하지 않습니다.");

        await this.commentRepository.createComment(postId, userId, comment)
    }

    updateComment = async (commentId, userId, postId, comment) => {
        const findPost = await this.commentRepository.findPostById(postId);
        const findComment = await this.commentRepository.findCommentById(commentId);
        if (!findPost) throw new Error("게시글이 존재하지 않습니다.");
        if (!findComment) throw new Error("댓글이 존재하지 않습니다.");
        if (findComment.UserId!=userId) throw new Error("댓글의 수정 권한이 존재하지 않습니다.")

        await this.commentRepository.updateComment(commentId, userId, comment)
    }

    deleteComment = async (commentId, userId, postId) => {
        const findPost = await this.commentRepository.findPostById(postId);
        const findComment = await this.commentRepository.findCommentById(commentId);
        if (!findPost) throw new Error("게시글이 존재하지 않습니다.");
        if (!findComment) throw new Error("댓글이 존재하지 않습니다.");
        if (findComment.UserId!==userId) throw new Error("댓글의 수정 권한이 존재하지 않습니다.")

        await this.commentRepository.deleteComment(commentId, userId)
    }
}

module.exports = CommentService;