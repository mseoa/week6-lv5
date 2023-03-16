const LikeService = require('../services/likes.service')

class LikesController {
    likeService = new LikeService();

    updateLike = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals.user;

            const result = await this.likeService.updateLike(postId, userId);

            result ? res.status(200).json({message:'게시글 좋아요를 등록하였습니다.'}) 
            : res.status(200).json({message: '게시글 좋아요를 취소하였습니다.'})
        } catch (error) {
            next(error)
        }
    }

    getMyLikedPosts = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const posts = await this.likeService.getMyLikedPosts(userId)

            res.status(200).json({posts: posts})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = LikesController;