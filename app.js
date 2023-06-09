const express = require("express");
const cookieParser = require("cookie-parser");

const routes = require('./routes')
const { errorHandler, errorLogger } = require('./middlewares/error-handler.middleware');

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());
app.use('/', routes);
app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
})

module.exports = app;