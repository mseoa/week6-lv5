const { Posts, Likes, Users, sequelize } = require('../models');
const { Op } = require('sequelize');
const { parseModelToFlatObject } = require('../helpers/sequelize.helpers'); 

class LikeRepository {
    findPostByPk = async (postId) => {
        const post = await Posts.findByPk(postId)

        return post;
    }

    findIsLike = async (postId,userId) => {
        const isLike = await Likes.findOne({
            where: {
                PostId: postId,
                userId: userId 
            }
        })

        return isLike;
    }

    createLike = async (postId,userId) => {
        await Likes.create({PostId:postId, UserId:userId})
    }

    deleteLike = async (postId,userId) => {
        await Likes.destroy({
            where: {PostId:postId, UserId:userId}
        })
    }

    findAllMyLikes = async (userId) => {
        const myLikes = await Likes.findAll({
            attributes: ['PostId'],
            where:{UserId:userId}
        })

        return myLikes
    }

    findAllMyLikedPosts = async (myLikedPostIds) => {
        const myLikedPosts = await Posts.findAll({
            attributes: [
                'postId',
                'title',
                'createdAt',
                'updatedAt',
                [sequelize.fn('COUNT',sequelize.col('Likes.UserId')),'likes']
            ],
            include: [
                {
                    model: Users,
                    attributes: ['userId','nickname']
                },
                {
                    model: Likes,
                    attributes: [],
                    required: true,
                }
            ],
            group: ['Posts.postId'],
            order: [[sequelize.fn('COUNT',sequelize.col('Likes.UserId')), 'DESC']],
            raw: true,
            where: {
                postId: {
                    [Op.in]: myLikedPostIds
                }
            }
        }).then((models) => models.map(parseModelToFlatObject))

        return myLikedPosts;
    }
}

module.exports = LikeRepository;