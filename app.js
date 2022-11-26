const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsHandler } = require('./middlewares/errorsHandler');
const router = require('./routes/index');

const { PORT = 3002 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(express.json());
app.use(requestLogger); // логгер запросов

// подключаем мидлвары, роуты и всё остальное...
app.use(router);

app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorsHandler); // централизованная обработка ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
