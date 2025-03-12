const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize('forumdb', 'root', process.env.DBKEY, {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;