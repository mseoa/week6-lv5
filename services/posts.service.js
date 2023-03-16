const PostRepository = require('../repositories/posts.repository');
 
class PostService {
    postRepository = new PostRepository();

    findAllPost = async () => {
        const allPost = await this.postRepository.findAllPost();
    
        allPost.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });

        return allPost.map((post)=>{
            return {
                postId : post.postId,
                userId : post.UserId,
                nickname : post.nickname,
                title : post.title,
                createdAt : post.createdAt,
                updatedAt : post.updatedAt
            };
        });
    };

    findPostById = async (postId) => {
        const findPost = await this.postRepository.findPostById(postId);

        return {
            postId : findPost.postId,
            userId : findPost.UserId,
            nickname : findPost.nickname,
            title : findPost.title,
            content: findPost.content,
            createdAt : findPost.createdAt,
            updatedAt : findPost.updatedAt
        }
    }

    createPost = async (userId, nickname, title, content) => {
        await this.postRepository.createPost(userId, nickname, title, content);
    }

    updatePost = async (postId, userId, title, content) =>{
        const findPost = await this.postRepository.findPostById(postId);
        if (findPost.UserId!==userId) throw new Error("게시글의 수정 권한이 존재하지 않습니다");
        if (!findPost) throw new Error("게시글 조회에 실패했습니다.");

        await this.postRepository.updatePost(postId, userId, title, content);
    }

    deletePost = async (postId, userId) => {
        const findPost = await this.postRepository.findPostById(postId);
        if (findPost.UserId!==userId) throw new Error("게시글의 삭제 권한이 존재하지 않습니다");
        if (!findPost) throw new Error("게시글 조회에 실패했습니다.");

        await this.postRepository.deletePost(postId, userId);
    }
}

module.exports = PostService;