const PostService = require("../services/posts.service");
const { InvalidParamsError } = require("../exceptions/index.exception");
 
class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    try {
        const posts = await this.postService.findAllPost();

        res.status(200).json({ posts: posts });
    } catch (error) {
        next(error);
    }
    
  };

  getPostById = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await this.postService.findPostById(postId);

        res.status(200).json({ post: post });
    } catch (error) {
        next(error);
    }
  };

  createPost = async (req, res, next) => {
    try {
        const { userId, nickname } = res.locals.user;
        const { title, content } = req.body;

        if (!userId || !nickname || !title || !content) {
            throw new InvalidParamsError();
          }

        await this.postService.createPost(userId, nickname, title, content);
        res.status(201).json({ message: "게시글 작성에 성공하였습니다." });
    } catch (error) {
        next(error)
    }
  };

  updatePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { userId } = res.locals.user;
        const { title, content } = req.body;

        await this.postService.updatePost(postId, userId, title, content);
        res.status(200).json({ message: "게시글을 수정하였습니다." });
    } catch (error) {
        next(error)
    }
  };

  deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { userId } = res.locals.user;

        await this.postService.deletePost(postId, userId);
        res.status(200).json({ message: "게시글을 삭제하였습니다." });
    } catch (error) {
        next(error);
    }
  };
}

module.exports = PostsController;
