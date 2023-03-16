'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// 컨피그 파일을 가져옴, 어떤 세팅을 가져올것인가
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

//ㅣ퀄라이즈 변수 선언
// 어느 디비와 연결되어있는지 정보
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// 파일을 읽어옴
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }); // 각각의 파일에 포문을 돌려서

// 각각 유저스 제이에서, 포스트 제이에서 이런 파일에 있는 클래스를 가져옴, 
// db.Users = Users
// db가 빈객체였는데 모델들을 빈객체에다가 넣어줌
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // 모델들의 연관관계까지도 가져옴
  }
});

// 디비 연결 데이터를 프로퍼티 시퀄라이즈로 가지고옴
db.sequelize = sequelize;
// 대문자는 라이브러리를 넣어준것
db.Sequelize = Sequelize;

// 모델이름 모은거를 디비에다가 넣음
module.exports = db;
