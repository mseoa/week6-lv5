const { Users } = require('../models');

class UserRepository {
    findPostByNickname = async (nickname) => {
        const user = await Users.findOne({ where : {nickname} });

        return user;
    }

    createUser = async (nickname, password) => {
        await Users.create({nickname, password});
    }
}

module.exports = UserRepository;