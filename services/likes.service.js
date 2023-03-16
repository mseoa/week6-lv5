const LikeRepository = require('../repositories/likes.repository')

class LikeService {
    likeRepository = new LikeRepository();

    updateLike = async (postId, userId) => {
        const findPost = await this.likeRepository.findPostByPk(postId)
        const isLike = await this.likeRepository.findIsLike(postId,userId)
        if (!findPost) throw new Error('게시글이 존재하지 않습니다.');
        if (!isLike) {
            await this.likeRepository.createLike(postId,userId)

            return true
        } else {
            await this.likeRepository.deleteLike(postId,userId)

            return false
        }
    }

    getMyLikedPosts = async (userId) => {
        const myLikes = await this.likeRepository.findAllMyLikes(userId);
        const myLikedPostIds = myLikes.map(post=>post.PostId)

        const findAllMyLikedPosts = await this.likeRepository.findAllMyLikedPosts(myLikedPostIds)
        
        return findAllMyLikedPosts
    }
}

module.exports = LikeService;

