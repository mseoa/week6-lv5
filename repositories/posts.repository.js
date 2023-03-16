const { Posts } = require('../models'); 

class PostRepository {
    findAllPost = async () => {
        const posts = await Posts.findAll();

        return posts;
    }

    findPostById = async (postId) => {
        const post = await Posts.findByPk(postId);

        return post;
    }

    createPost = async (userId, nickname, title, content) => {
        await Posts.create({ UserId: userId, nickname, title, content })
    }

    updatePost = async (postId, userId, title, content) => {
        const updatePostData = await Posts.update(
            { title, content },
            { where: { postId, UserId: userId } },
          );

        return updatePostData; // 왜 리턴해야되는거징..?
    }

    deletePost = async (postId, userId) => {
        const deletePostData = await Posts.destroy({ where: { postId, UserId: userId } });

        return deletePostData;
    }
}

module.exports = PostRepository;