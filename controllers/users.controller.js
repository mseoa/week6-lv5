const UserService = require('../services/users.service')

class UsersController {
    userService = new UserService();

    createUser = async (req, res, next) => {
        try {
            const { nickname, password, confirm } = req.body;

            if (!nickname || !password || !confirm) {
                throw new InvalidParamsError();
            }
            await this.userService.createUser(nickname, password, confirm);
            res.status(201).json({ message: "회원 가입에 성공하였습니다." });   
        } catch (error) {
            next(error);
        };    
    };
};

module.exports = UsersController;