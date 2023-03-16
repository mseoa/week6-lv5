const UserRepository = require('../repositories/users.repository');

class UserService {
    userRepository = new UserRepository();

    createUser = async (nickname, password, confirm) => {

        let nickCheck = /^[a-zA-Z0-9]{3,}$/
        if (!nickCheck.test(nickname)) throw new Error("닉네임의 형식이 일치하지 않습니다.");
        
        if (password !== confirm) throw new Error("패스워드가 패스워드 확인란과 다릅니다.");
        
        if (password.includes(nickname)||password.length<4) throw new Error("패스워드 형식이 일치하지 않습니다.");
        
        const findUser = await this.userRepository.findPostByNickname(nickname);
        if (findUser) throw new Error("중복된 닉네임입니다.");

        await this.userRepository.createUser(nickname, password);
    }
}

module.exports = UserService;

