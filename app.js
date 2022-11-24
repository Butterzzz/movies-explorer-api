const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3002 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(express.json());

// подключаем мидлвары, роуты и всё остальное...
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
