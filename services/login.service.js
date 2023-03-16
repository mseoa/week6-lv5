const LoginRepository = require('../repositories/login.repository');
const jwt = require("jsonwebtoken");
require('dotenv').config();

class LoginService {
    loginRepository = new LoginRepository();

    userLogin = async (nickname, password) => {
        const user = await this.loginRepository.findUserByNickname(nickname);

        if (!user) {
            throw new Error("존재하지 않는 닉네임입니다.")
        } else if (user.password !== password) {
            throw new Error("비밀번호가 일치하지 않습니다.")
        }

        const token = jwt.sign({
            userId: user.userId
          }, process.env.PRIVATE_KEY);
        
        return token;
    };
};

module.exports = LoginService;