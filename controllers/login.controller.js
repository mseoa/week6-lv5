const LoginService = require('../services/login.service')

class LoginController {
    loginService = new LoginService();

    userLogin = async (req, res, next) => {
        try {
            const { nickname, password } = req.body;

            if (!nickname || !password) {
                throw new InvalidParamsError();
            }
            const token = await this.loginService.userLogin(nickname, password);

            res.cookie("authorization", `Bearer ${token}`);
            res.status(200).json({ message: "로그인 성공" })
        } catch (error) {
            next(error);
        };
    }; 
 };

module.exports = LoginController;