require('dotenv').config();

const { NODE_ENV, PORT, JWT_SECRET } = process.env;

const config = {
  PORT: NODE_ENV === 'production' && PORT ? PORT : 3001,
  JWT_SECRET: NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'JWT_SECRET_DEV',
  HOST: 'localhost',
  DBPORT: 27017,
  DBNAME: 'moviesdb',

};

module.exports = config;
