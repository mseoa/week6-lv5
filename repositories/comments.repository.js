const { Comments } = require('../models');
const { Posts } = require("../models");
const { Users } = require("../models");
const { parseModelToFlatObject } = require('../helpers/sequelize.helpers');


class CommentRepository {
    findCommentsByPostId = async (postId) =>  {
        const comments = await Comments.findAll({
            attributes: ['commentId', 'comment','createdAt','updatedAt'],
            include: [
                {
                    model: Users,
                    attributes: ['userId','nickname']
                }
            ],
            where: [{ PostId: postId }],
            order: [['createdAt', 'DESC']],
            raw: true,
        }).then((models) => models.map(parseModelToFlatObject));

        return comments
    }

    findPostById = async (postId) => {
        const post = await Posts.findByPk(postId);

        return post;
    }

    createComment = async (postId, userId, comment) => {
        await Comments.create({PostId:postId, UserId:userId, comment})
    }

    findCommentById = async (commentId) => {
        const comment = await Comments.findByPk(commentId);

        return comment;
    }

    updateComment = async (commentId, userId, comment) => {
        await Comments.update(
            { comment },
            {where: { commentId, UserId: userId }},
        );
    }

    deleteComment = async (commentId, userId) => {
        await Comments.destroy(
            {where: { commentId, UserId: userId }},
        );
    }
}

module.exports = CommentRepository;