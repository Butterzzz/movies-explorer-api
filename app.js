require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsHandler } = require('./middlewares/errorsHandler');
const cors = require('./middlewares/cors');
const router = require('./routes/index');

const { PORT = 3001, DATABASE = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;
const app = express();

mongoose.connect(DATABASE);

app.use(express.json());
app.use(requestLogger); // логгер запросов
app.use(cors);
app.use(helmet()); // настройка заголовков HTTP
app.use(limiter); // для защиты от DoS-атак
app.disable('x-powered-by'); // отключаем заголовок, указывающий платформу приложений сервера

app.use(router); // подключаем роуты

app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorsHandler); // централизованная обработка ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
