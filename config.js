require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  DBHOST,
  DBPORT,
  DBNAME,
} = process.env;

const config = {
  PORT: NODE_ENV === 'production' && PORT ? PORT : 3001,
  JWT_SECRET: NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'JWT_SECRET_DEV',
  DBHOST: NODE_ENV === 'production' && DBHOST ? DBHOST : 'localhost',
  DBPORT: NODE_ENV === 'production' && DBPORT ? DBPORT : 27017,
  DBNAME: NODE_ENV === 'production' && DBNAME ? DBNAME : 'moviesdb',

};

module.exports = config;
