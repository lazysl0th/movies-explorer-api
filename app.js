const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const { INTERNAL_SERVER_ERROR } = require('./constant');
const {
  PORT,
  HOST,
  DBPORT,
  DBNAME,
} = require('./config');

const app = express();

app.use(helmet());

app.use(cors);

app.use(cookieParser());

mongoose.connect(`mongodb://${HOST}:${DBPORT}/${DBNAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR.statusCode, message } = err;

  res.status(statusCode).send({
    message: statusCode === INTERNAL_SERVER_ERROR.statusCode
      ? INTERNAL_SERVER_ERROR.text
      : message,
  });
  next();
});

app.listen(PORT);
